import express from 'express';
import { getWorkSites, getWorkSiteById, createWorkSite, updateWorkSite, deleteWorkSiteById } from '../Querries/workSites.js';
import { getWorksManagerById } from '../Querries/worksManagers.js';
import { getAddressById } from '../Querries/addresses.js';
import { getOrderSheetsByWorksiteId } from '../Querries/orderSheets.js';


const router = express.Router();

// Retourne tous les workSites sous la forme d'un tableau d'objets {id, name, works_manager_id, address_id}
router.get('/', async (req, res) => {
    const workSites = await getWorkSites();
    res.send(workSites);
})

// Retourne un workSite sous la forme d'un objet {id, name, works_manager_id, address_id}
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const workSite = await getWorkSiteById(id);
    res.send(workSite);
})

// Ajoute un workSite après avoir checké si l'ouvrier existe et l'adresse existe
router.post('/', async (req, res) => {

    const { name, works_manager_id, address_id } = req.body;
    const errors = [];

    // Vérifier si l'ouvrier existe
    const worksManager = await getWorksManagerById(works_manager_id);
    if (!worksManager) {
        errors.push(`Il n'y a aucun conducteur de travaux avec l'id ${works_manager_id}`);
    }

    // Vérifier si l'adresse existe
    const address = await getAddressById(address_id);
    if (!address) {
        errors.push(`Il n'y a aucune adresse avec l'id ${address_id}`);
    }

    // Si il manque un conducteur de travaux ou une adresse, afficher un message d'erreur
    if (errors.length > 0) {
        res.status(400).send(errors);
    }

    // Sinon ajouter le workSite
    else {
        const workSite = await createWorkSite(name, works_manager_id, address_id);
        res.status(201).send(workSite);
    }
})

// Modifie un workSite
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, works_manager_id, address_id } = req.body;
    const errors = [];

    // Vérifier si l'ouvrier existe
    const worksManager = await getWorksManagerById(works_manager_id);
    if (!worksManager) {
        errors.push(`Il n'y a aucun conducteur de travaux avec l'id ${works_manager_id}`);
    }

    // Vérifier si l'adresse existe
    const address = await getAddressById(address_id);
    if (!address) {
        errors.push(`Il n'y a aucune adresse avec l'id ${address_id}`);
    }

    // Si il manque un conducteur de travaux ou une adresse, afficher un message d'erreur
    if (errors.length > 0) {
        res.status(400).send(errors);
    }

    // Sinon modifier le workSite
    else {
        const workSite = await updateWorkSite(id, name, works_manager_id, address_id);
        res.send(workSite);
    }
})

// Supprime un workSite en fonction de son id
// Attention si une ou plusieurs fiches de commande existe avec ce chantier on ne peut pas supprimer
// il faut supprimer toutes les fiches de commande associées à ce chantier avant
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    // Récupérer toutes les fiches de commande associées à ce chantier
    const order_sheets = await getOrderSheetsByWorksiteId(id);

    // Si des fiches de commande existent, afficher un message d'erreur
    if (order_sheets.length > 0) {
        const order_sheet_ids = order_sheets.map(order_sheet => order_sheet.id);
        res.status(400).send(`Impossible de supprimer le chantier ${id} car il est associé aux fiches de commandes suivantes : ${order_sheet_ids.join(', ')}`);
        return;
    }

    // Supprimer le chantier si aucune fiche de commande n'est associée
    const workSite = await deleteWorkSiteById(id);
    res.send(workSite);
})


export default router;