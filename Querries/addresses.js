import pool from '../utils/databaseConst.js';


export async function getAddresses() {
    const [rows] = await pool.query(`SELECT * FROM address`)
    return rows
}

export async function getAddressById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM address 
    WHERE id = ?`, [id])
    return rows[0]
}

export async function createAddress(street, postal_code, city) {
    if (street && postal_code && city) {
    const [result] = await pool.query(`
    INSERT
    INTO address 
    (street, postal_code, city)
    VALUES (?, ?, ?)`, [street, postal_code, city])
    const id = result.insertId
    return getAddressById(id)
    } else {
    return `Adresse non crée ! Veuillez vérifier que les champs street, postal_code, city sont remplis.`
    }
}

export async function updateAddress(id, street, postal_code, city) {
    if (street && postal_code && city) {
    const [result] = await pool.query(`
    UPDATE address
    SET street = ?, postal_code = ?, city = ?
    WHERE id = ?`, [street, postal_code, city, id])
    return getAddressById(id)
    } else {
    return `Adresse inchangée ! Veuillez vérifier que les champs street, postal_code, city sont remplis.`
    }
}

export async function getAddressesByCity(city) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM address 
    WHERE city = ?`, [city])
    return rows
}

export async function deleteAddressById(id) {
    const [result] = await pool.query(`
    DELETE
    FROM address
    WHERE id = ?`, [id])
    return `Adresse avec l'id: ${id} supprimée`
}

