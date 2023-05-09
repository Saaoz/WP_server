import pool from '../utils/databaseConst.js';

export async function getFoldings() {
    const [rows] = await pool.query(`SELECT * FROM folding`)
    return rows
}

export async function getFoldingById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM folding 
    WHERE id = ?`, [id])
    return rows[0]
}

export async function createFolding(category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id) {
    if (category && type && ral && thickness && quantity && length && dim1 && angle1 && order_sheet_id) {
    const [result] = await pool.query(`
    INSERT
    INTO folding
    (category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id])
    const id = result.insertId
    return getFoldingById(id)
    } else {
        return `Pliage non créé ! Veuillez remplir tous les champs en vérifiant leurs noms : category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id`
    }
}

export async function updateFolding(id, category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id) {
    if (category && type && ral && thickness && quantity && length && dim1 && angle1 && order_sheet_id) {
    const [result] = await pool.query(`
    UPDATE folding
    SET category = ?,   
        type = ?,
        ral = ?,
        thickness = ?,
        quantity = ?,
        length = ?,
        dim1 = ?,
        dim2 = ?,
        dim3 = ?,
        dim4 = ?,
        dim5 = ?,
        dim6 = ?,
        angle1 = ?,
        angle2 = ?,
        angle3 = ?,
        angle4 = ?,
        angle5 = ?,
        order_sheet_id = ?
    WHERE id = ?`, [category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id, id])
    return getFoldingById(id)
    } else {
        return `Pliage inchangé ! Veuillez remplir tous les champs en vérifiant leurs noms : category, type, ral, thickness, quantity, length, dim1, dim2, dim3, dim4, dim5, dim6, angle1, angle2, angle3, angle4, angle5, order_sheet_id`
    }
}

export async function deleteFolding(id) {
    const [result] = await pool.query(`
    DELETE
    FROM folding
    WHERE id = ?`, [id])
    return `Pliage avec l'id: ${id} supprimé`
}

export async function getFoldingsByOrderSheetId(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM folding 
    WHERE order_sheet_id = ?`, [id])
    return rows
}