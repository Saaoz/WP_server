import express from 'express';
import { getOrderSheets, getOrderSheetById, createOrderSheet, updateOrderSheet, deleteOrderSheetById, getOrderSheetsByWorksiteId } from '../Querries/orderSheets.js';
import { getWorkSiteById } from '../Querries/workSites.js';
import { getAddressById } from '../Querries/addresses.js';
import { getFoldingsByOrderSheetId } from '../Querries/foldings.js';

const router = express.Router();

// Retourne toutes les fiches de commandes sous la forme d'un tableau d'objets { id, created_at, worksite_id, worksite_address_id }
router.get('/', async (req, res) => {
    const orderSheets = await getOrderSheets();
    res.send(orderSheets);
})

// Retourne toutes les fiches de commandes en fonction de l'id d'un chantier sous la forme d'un tableau d'objets { id, created_at, worksite_id, worksite_address_id }
router.get('/worksite/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const orderSheets = await getOrderSheets();
    const orderSheetsByWorksite = []

    orderSheets.forEach(orderSheet => {
        if (orderSheet.worksite_id === id ) {
            orderSheetsByWorksite.push(orderSheet);
        }
    })
    res.send(orderSheetsByWorksite.reverse());
})

// Retourne une fiche de commande sous la forme d'un objet { id, created_at, worksite_id, worksite_address_id }
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const orderSheet = await getOrderSheetById(id);
    res.send(orderSheet);
})

// Ajoute une fiche de commande après avoir checké si worksite_id et worksite_address_id existent
router.post('/', async (req, res) => {
    const { worksite_id, worksite_address_id } = req.body;
    const errors = [];

    // Vérifier si worksite_id existe
    const worksite = await getWorkSiteById(worksite_id);
    if (!worksite) {
        errors.push(`Il n'y a aucun chantier avec l'id ${worksite_id}`);
    }

    // Vérifier si worksite_address_id existe
    const address = await getAddressById(worksite_address_id);
    if (!address) {
        errors.push(`Il n'y a aucune adresse avec l'id ${worksite_address_id}`);
    }

    // Si il manque un chantier ou une adresse, afficher un message d'erreur
    if (errors.length > 0) {
        res.status(400).send(errors);
    }

    // Sinon ajouter la fiche de commande
    else {
        const orderSheet = await createOrderSheet(worksite_id, worksite_address_id);
        res.status(201).send(orderSheet);
    }
})

// Modifie une fiche de commande après avoir checké si worksite_id et worksite_address_id existent
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { worksite_id, worksite_address_id } = req.body;
    const errors = [];

    // Vérifier si worksite_id existe
    const worksite = await getWorkSiteById(worksite_id);
    if (!worksite) {
        errors.push(`Il n'y a aucun chantier avec l'id ${worksite_id}`);
    }

    // Vérifier si worksite_address_id existe
    const address = await getAddressById(worksite_address_id);
    if (!address) {
        errors.push(`Il n'y a aucune adresse avec l'id ${worksite_address_id}`);
    }

    // Si il manque un chantier ou une adresse, afficher un message d'erreur
    if (errors.length > 0) {
        res.status(400).send(errors);
    }

    // Sinon modifier la fiche de commande
    else {
        const orderSheet = await updateOrderSheet(id, worksite_id, worksite_address_id);
        res.send(orderSheet);
    }
})

// Supprime une fiche de commande en fonction de son id
// Attention si un ou plusieurs pliages existent avec cette fiche de commande on ne peut pas supprimer
// il faut supprimer tous les pliages associés à cette fiche de commande avant
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    // Récuperer les pliages associés à la fiche de commande
    const foldings = await getFoldingsByOrderSheetId(id);

    // Si des pliages associés à la fiche de commande existent, afficher un message d'erreur
    if (foldings.length > 0) {
        const foldingsIds = foldings.map(folding => folding.id);
        res.status(400).send(`Impossible de supprimer cette fiche de commande ${id} car elle est associé aux pliages suivant : ${foldingsIds.join(', ')}`);
        return;
    }

    // Sinon supprimer la fiche de commande
    const orderSheet = await deleteOrderSheetById(id);
    res.send(orderSheet);
})


// Trouve les order_sheets en fonction de worksite_id
router.get('/work_site/:work_site_id', async (req, res) => {
    const worksite_id = req.params.work_site_id;
    const order_sheets = await getOrderSheetsByWorksiteId(worksite_id);
    res.send(order_sheets);
})

export default router;