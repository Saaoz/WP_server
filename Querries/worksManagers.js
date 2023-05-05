import pool from '../utils/databaseConst.js';

export async function getWorksManagers() {
    const [rows] = await pool.query(`SELECT * FROM works_manager`)
    return rows
}

export async function getWorksManagerById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM works_manager 
    WHERE id = ?`, [id])
    return rows[0]
}

export async function createWorksManager(firstname, lastname, mail) {
    const [result] = await pool.query(`
    INSERT
    INTO works_manager 
    (firstname, lastname, mail)
    VALUES (?, ?, ?)`, [firstname, lastname, mail])
    const id = result.insertId
    return getWorksManagerById(id)
}

export async function updateWorksManager(id, firstname, lastname, mail) {
    const [result] = await pool.query(`
    UPDATE works_manager
    SET firstname = ?, lastname = ?, mail = ?
    WHERE id = ?`, [firstname, lastname, mail, login, password, id])
    return getWorksManagerById(id)
}

export async function deleteWorksManagerById(id) {
    const [result] = await pool.query(`
    DELETE
    FROM works_manager
    WHERE id = ?`, [id])
    return `Conducteur de travaux avec l'id: ${id} supprimé`
}