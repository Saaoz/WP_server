import express from 'express';
import { getAddresses, getAddressesById, createAddress, updateAddress, deleteAddressById } from '../Querries/addresses.js';

const router = express.Router();

// Retourne toutes les adresses sous la forme d'un tableau d'objets {id, street, postal_code, city}
router.get('/', async (req, res) => {
    const addresses = await getAddresses();
    res.send(addresses);
}) 

// Retourne une seule adresse sous la forme d'un objet {id, street, postal_code, city}
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const address = await getAddressesById(id);
    res.send(address);
})

// Ajoute une adresse
router.post('/', async (req, res) => {
    const { street, postal_code, city } = req.body;
    const address = await createAddress(street, postal_code, city);
    res.status(201).send(address);
})

// Modifie une adresse
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { street, postal_code, city } = req.body;
    const address = await updateAddress(id, street, postal_code, city);
    res.status(201).send(address);
    if (!address) {
        res.sendStatus(404);
    }
})

// Supprime une adresse en fonction de son id
// Attention si un chantier existe avec cette adresse on ne peut pas supprimer
// il faut supprimer tous les chantiers associés à cette adresse avant
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const address = await deleteAddressById(id);
    res.send(address);
})

export default router