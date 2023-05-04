import express from 'express';
import { getWorksManagers, getWorksManagerById, createWorksManager, updateWorksManager, deleteWorksManagerById } from '../Querries/worksManagers.js';

const router = express.Router();

// Retourne tous les worksManagers sous la forme d'un tableau d'objets {id, firstname, lastname, mail}
router.get('/', async (req, res) => {
    const worksManagers = await getWorksManagers();
    res.send(worksManagers);
});

// Retourne un seul worksManager sous la forme d'un objet {id, firstname, lastname, mail}
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const worksManager = await getWorksManagerById(id);
    res.send(worksManager);
});

// Ajoute un worksManager
router.post('/', async (req, res) => {
    const { firstname, lastname, mail } = req.body;
    const worksManager = await createWorksManager(firstname, lastname, mail);
    res.status(201).send(worksManager);
});

// Modifie un worksManager
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, mail } = req.body;
    const worksManager = await updateWorksManager(id, firstname, lastname, mail);
    res.send(worksManager);
});

// Supprime un worksManager en fonction de son id
// Attention si un chantier existe avec ce worksManager on ne peut pas supprimer
// il faut supprimer tous les chantiers associés à ce worksManager avant
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const worksManager = await deleteWorksManagerById(id);
    res.send(worksManager);
});

export default router;
