import pool from "../utils/databaseConst.js";

export async function getSuppliers() {
    const [rows] = await pool.query(`SELECT * FROM supplier`);
    return rows;
}

export async function getSupplierById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM supplier 
    WHERE id = ?`, [id]);
    return rows[0];
}

export async function createSupplier(name, mail, folding_id) {
    const [result] = await pool.query(`
    INSERT
    INTO supplier
    (name, mail, folding_id)
    VALUES (?, ?, ?)`, [name, mail, folding_id])
    const id = result.insertId
    return getSupplierById(id)
}

export async function updateSupplier(id, name, mail, folding_id) {
    const [result] = await pool.query(`
    UPDATE supplier
    SET name = ?,
        mail = ?,
        folding_id = ?
    WHERE id = ?`, [name, mail, folding_id, id])
    return getSupplierById(id)
}

export async function deleteSupplier(id) {
    const [result] = await pool.query(`
    DELETE
    FROM supplier
    WHERE id = ?`, [id])
    return `Fournisseur avec l'id: ${id} supprimé`
}

export async function getSuppliersByFoldingId(folding_id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM supplier 
    WHERE folding_id = ?`, [folding_id]);
    return rows;
}