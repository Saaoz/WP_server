import express from 'express';
import { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from '../Querries/suppliers.js'
import {getFoldingById} from '../Querries/foldings.js'


const router = express.Router();

// Retourne tous les suppliers sous la forme d'un tableau d'objets { id, name, mail, folding_id }
router.get('/', async (req, res) => {
    const suppliers = await getSuppliers();
    res.send(suppliers);
})

// Retourne un seul supplier sous la forme d'un objet
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const supplier = await getSupplierById(id);
    res.send(supplier)
})

// Ajoute un supplier en vérifiant si le folding existe
router.post('/', async (req, res) => {
    const { name, mail, folding_id } = req.body;
    const errors = [];

    // Vérifier si le folding existe
    const folding = await getFoldingById(folding_id);
    if (!folding) {
        errors.push(`Il n'y a pas de folding avec l'id ${folding_id}`);
        res.status(400).send(errors);
    } else {
        const supplier = await createSupplier(name, mail, folding_id);
        res.status(201).send(supplier);
    }
})

// Modifie un supplier en vérifiant si le folding existe
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const { name, mail, folding_id } = req.body
    const errors = [];
    // Vérifier si le folding existe
    const folding = await getFoldingById(folding_id);
    if (!folding) {
        errors.push(`Il n'y a pas de folding avec l'id ${folding_id}`);
        res.status(400).send(errors);
    } else {
        const supplier = await updateSupplier(id, name, mail, folding_id)
        res.status(201).send(supplier)
        if (!supplier) {
            res.sendStatus(404)
        }
    }
})

// Supprimer un supplier 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const supplier = await deleteSupplier(id)
    res.send(supplier)
})

export default router;