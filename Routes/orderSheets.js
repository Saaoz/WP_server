import express from 'express';
import { getOrderSheets, getOrderSheetById, createOrderSheet, updateOrderSheet, deleteOrderSheetById } from '../Querries/orderSheets.js';
import { getWorkSiteById } from '../Querries/workSites.js';
import { getAddressById } from '../Querries/addresses.js';

const router = express.Router();

// Retourne toutes les fiches de commandes sous la forme d'un tableau d'objets { id, created_at, worksite_id, worksite_address_id }
router.get('/', async (req, res) => {
    const orderSheets = await getOrderSheets();
    res.send(orderSheets);
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

// Modifie une fiche de commande
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { worksite_id, worksite_address_id } = req.body;
    const orderSheet = await updateOrderSheet(id, worksite_id, worksite_address_id);
    res.send(orderSheet);
})

// Supprime une fiche de commande en fonction de son id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const orderSheet = await deleteOrderSheetById(id);
    res.send(orderSheet);
})

export default router