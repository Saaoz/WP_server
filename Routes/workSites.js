import express from 'express';
import { getWorkSites, getWorkSiteById, createWorkSite, updateWorkSite, deleteWorkSiteById } from '../Querries/workSites.js';
import { getWorksManagerById } from '../Querries/worksManagers.js';
import { getAddressById } from '../Querries/addresses.js';

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
    const workSite = await updateWorkSite(id, name, works_manager_id, address_id);
    res.send(workSite);
})

// Supprime un workSite en fonction de son id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const workSite = await deleteWorkSiteById(id);
    res.send(workSite);
})


export default router;