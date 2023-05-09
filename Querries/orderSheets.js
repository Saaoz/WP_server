import pool from '../utils/databaseConst.js';

export async function getOrderSheets() {
    const [rows] = await pool.query(`SELECT * FROM order_sheet`)
    return rows
}

export async function getOrderSheetById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM order_sheet 
    WHERE id = ?`, [id])
    return rows[0]
}

export async function createOrderSheet(worksite_id, worksite_address_id) {
    const [result] = await pool.query(`
    INSERT
    INTO order_sheet
    (worksite_id, worksite_address_id)
    VALUES (?, ?)`, [worksite_id, worksite_address_id])
    const id = result.insertId
    return getOrderSheetById(id)
}

export async function updateOrderSheet(id, worksite_id, worksite_address_id) {
    const [result] = await pool.query(`
    UPDATE order_sheet
    SET worksite_id = ?, worksite_address_id = ?
    WHERE id = ?`, [worksite_id, worksite_address_id, id])
    return getOrderSheetById(id)
}

export async function deleteOrderSheetById(id) {
    const [result] = await pool.query(`
    DELETE
    FROM order_sheet
    WHERE id = ?`, [id])
    return `OrderSheet avec l'id: ${id} supprimée`
}

export async function getOrderSheetsByWorksiteId(worksite_id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM order_sheet 
    WHERE worksite_id = ?`, [worksite_id])
    return rows
}