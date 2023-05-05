import express from 'express';
import { getWorkSites, getWorkSiteById, createWorkSite, updateWorkSite, deleteWorkSiteById } from '../Querries/workSites.js';

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

// Ajoute un workSite
router.post('/', async (req, res) => {
    const { name, works_manager_id, address_id } = req.body;
    const workSite = await createWorkSite(name, works_manager_id, address_id);
    res.status(201).send(workSite);
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