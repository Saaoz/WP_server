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

export async function getWorksManagerByMail(mail) {
    const [rows] = await pool.query(`
    SELECT *
    FROM works_manager
    WHERE mail = ?`, [mail])
    return rows[0]
}

export async function createWorksManager(firstname, lastname, mail, password) {
    if (firstname && lastname && mail && password) {
    const [result] = await pool.query(`
    INSERT
    INTO works_manager 
    (firstname, lastname, mail, password)
    VALUES (?, ?, ?, ?, ?)`, [firstname, lastname, mail, password])
    const id = result.insertId
    return getWorksManagerById(id)
    } else {
        return `Conducteur de travaux non créé ! Veuillez remplir tous les champs en vérifiant leurs noms : firstname, lastname, mail, password`
    }
}

export async function updateWorksManager(id, firstname, lastname, mail, password) {
    if (firstname && lastname && mail && password) {
    const [result] = await pool.query(`
    UPDATE works_manager
    SET firstname = ?, lastname = ?, mail = ?, password = ?
    WHERE id = ?`, [firstname, lastname, mail, password, id])
    return getWorksManagerById(id)
    } else {
        return `Conducteur de travaux inchangé ! Veuillez remplir tous les champs en vérifiant leurs noms : firstname, lastname, mail, password`
    }
}

export async function deleteWorksManagerById(id) {
    const [result] = await pool.query(`
    DELETE
    FROM works_manager
    WHERE id = ?`, [id])
    return `Conducteur de travaux avec l'id: ${id} supprimé`
}