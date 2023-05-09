import express from 'express';
import { getFoldings, getFoldingById, createFolding, updateFolding, deleteFolding, getFoldingsByOrderSheetId } from '../Querries/foldings.js';
import { getOrderSheetById } from '../Querries/orderSheets.js';
import { getSuppliersByFoldingId } from '../Querries/suppliers.js';


const router = express.Router();

// Retourne tous les foldings sous la forme d'un tableau d'objets {id, category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id, order_sheet_worksite_id, order_sheet_worksite_address_id}
router.get('/', async (req, res) => {
    const foldings = await getFoldings();
    res.send(foldings);
})

// Retourne un seul folding sous la forme d'un objet
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const folding = await getFoldingById(id);
    res.send(folding);
})

// Ajoute un folding en vérifiant si la fiche de commande existe
router.post('/', async (req, res) => {
    const { category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id } = req.body;
    const errors = [];

    // Vérifie si la fiche de commande existe
    const orderSheet = await getOrderSheetById(order_sheet_id);
    if (!orderSheet) {
        errors.push(`Il n'y a aucune fiche de commande avec l'id ${order_sheet_id}`);
        res.status(400).send(errors);
    } else {
        const folding = await createFolding(category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id)
        res.status(201).send(folding);
    }
})

// Modifie un folding
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id } = req.body;
    const errors = [];
    // Vérifie si la fiche de commande existe
    const orderSheet = await getOrderSheetById(order_sheet_id);
    if (!orderSheet) {
        errors.push(`Il n'y a aucune fiche de commande avec l'id ${order_sheet_id}`);
        res.status(400).send(errors);
    } else {
        const folding = await updateFolding(id, category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id)
        res.status(201).send(folding)
        if (!folding) {
            res.sendStatus(404)
        }
    }
})

// Supprime un folding en fonction de son id
// Attention si un ou plusieurs suppliers exsitent avec ce folding on ne peut pas supprimer
// il faut supprimer tous les suppliers associés à ce folding avant
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    // Récupérer tous les suppliers associés à ce folding
    const suppliers = await getSuppliersByFoldingId(id);

    // Si des suppliers existent, afficher un message d'erreur
    if (suppliers.length > 0) {
        const suppliers_ids = suppliers.map((supplier) => supplier.id);
        res.status(400).send(`Impossible de supprimer le pliage ${id} car il est associé aux fournisseurs suivants : ${suppliers_ids.join(', ')}`);
        return;
    }

    const folding = await deleteFolding(id);
    res.send(folding);
})

// Trouve les foldings en fonction de order_sheet_id
router.get('/order_sheet/:order_sheet_id', async (req, res) => {
    const order_sheet_id = req.params.order_sheet_id;
    const foldings = await getFoldingsByOrderSheetId(order_sheet_id);
    res.send(foldings);
})

export default router;