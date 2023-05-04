import mysql from 'mysql2/promise';
import fs from 'fs/promises';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true
});

const sql = await fs.readFile('./utils/WibFoldingDBReset.sql', 'utf-8');

await connection.query(sql);

console.log('Base de données créée avec succès !');
