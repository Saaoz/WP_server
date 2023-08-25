import express from 'express';
import { getWorksManagers, getWorksManagerById, createWorksManager, updateWorksManager, deleteWorksManagerById } from '../Querries/worksManagers.js';
import { getWorkSitesByWorksManagerId } from '../Querries/workSites.js';
import bcrypt from 'bcrypt';
// import { Jwt } from 'jsonwebtoken';

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
    const { firstname, lastname, mail, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 13);
    const worksManager = await createWorksManager(firstname, lastname, mail, hashpassword);
    res.status(201).send(worksManager);
});

// Modifie un worksManager
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, mail, password } = req.body;
    const worksManager = await updateWorksManager(id, firstname, lastname, mail, password);
    res.send(worksManager);
});

// Supprime un worksManager en fonction de son id
// Attention si un chantier existe avec ce worksManager on ne peut pas supprimer
// il faut supprimer tous les worksites associés à ce worksManager avant
router.delete('/:id', async (req, res) => {
    const worksManagerId = req.params.id;

    // Récupérer tous les worksites associés à cette personne
    const worksites = await getWorkSitesByWorksManagerId(worksManagerId);

    // Si des worksites sont associés à cette personne, afficher un message d'erreur
    if (worksites.length > 0) {
        const worksitesIds = worksites.map(worksite => worksite.id);
        res.status(400).send(`Impossible de supprimer ce conducteur de travaux ${worksManagerId} car il est associé aux chantiers suivants : ${worksitesIds.join(", ")}`);
        return;
    }

    // Supprimer le worksManager si aucun chantier n'est associé
    const worksManager = await deleteWorksManagerById(worksManagerId);
    res.send(worksManager);
});

export default router;