import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { getWorksManagerByMail } from '../Querries/worksManagers.js';

const login = async (req, res) => {
    try {
        const mail = req.body.mail
        const password = req.body.password
        const worksManager = await getWorksManagerByMail(mail)

        if (!worksManager) {
            return res.status(401).json({ message: 'Connexion non autorisée.' })
        }
        
        const isValid = bcrypt.compareSync(password, worksManager.password)

        if (!isValid) {
            return res.status(401).json({ message: 'Connexion non autorisée. 2' })
        }

        res.status(200).json({
            works_manager_id: worksManager.id,
            works_manager_firstname: worksManager.firstname,
            works_manager_lastname: worksManager.lastname,
            works_manager_mail: worksManager.mail
        })
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue." });
    }
}


export default login;