import pool from '../utils/databaseConst.js';

export async function getWorkSites() {
    const [rows] = await pool.query(`SELECT * FROM worksite`)
    return rows
}

export async function getWorkSiteById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM worksite 
    WHERE id = ?`, [id])
    return rows[0]
}

export async function createWorkSite(name, works_manager_id, address_id) {
    if (name && works_manager_id && address_id) {
    const [result] = await pool.query(`
    INSERT
    INTO worksite 
    (name, works_manager_id, address_id)
    VALUES (?, ?, ?)`, [name, works_manager_id, address_id])
    const id = result.insertId
    return getWorkSiteById(id)
    } else {
        return `Chantier non crée ! Veuillez renseigner tous les champs et vérifier leurs noms : name, works_manager_id, address_id`
    }
}

export async function updateWorkSite(id, name, works_manager_id, address_id) {
    if (name && works_manager_id && address_id) {
    const [result] = await pool.query(`
    UPDATE worksite
    SET name = ?, works_manager_id = ?, address_id = ?
    WHERE id = ?`, [name, works_manager_id, address_id, id])
    return getWorkSiteById(id)
    } else {
        return `Chantier inchangé ! Veuillez renseigner tous les champs et vérifier leurs noms : name, works_manager_id, address_id`
    }
}

export async function deleteWorkSiteById(id) {
    const [result] = await pool.query(`
    DELETE
    FROM worksite
    WHERE id = ?`, [id])
    return `Chantier avec l'id: ${id} supprimé`
}

export async function getWorkSitesByWorksManagerId(worksManagerId) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM worksite 
    WHERE works_manager_id = ?`, [worksManagerId]);
    return rows
}

export async function getWorkSitesByAddressId(addressId) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM worksite 
    WHERE address_id = ?`, [addressId]);
    return rows
}

