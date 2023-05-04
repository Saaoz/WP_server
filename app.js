import express from 'express';


// imports des différentes querries de la base de données en fonction de leur table
import { getWorksManagers, getWorksManagerById, createWorksManager, updateWorksManager, deleteWorksManagerById } from './worksManagers/querries.js';

const app = express();

app.use(express.json());

// récupère les workmanagers au format tableau d'objets (id, firstname, lastname, mail, login, password)
app.get('/api/works_managers', async (req, res) => {
    const worksManagers = await getWorksManagers();
    res.send(worksManagers);
}) 

// récupère le workmanager au format objet (id, firstname, lastname, mail, login, password)
app.get('/api/works_managers/:id', async (req, res) => {
    const id = req.params.id;
    const worksManager = await getWorksManagerById(id);
    res.send(worksManager);
})

// crée un nouveau workmanager
app.post('/api/works_managers', async (req, res) => {
    const { firstname, lastname, mail } = req.body;
    const worksManager = await createWorksManager(firstname, lastname, mail);
    res.status(201).send(worksManager);
})

// modifie un nouveau workmanager
app.put('/api/works_managers/:id', async (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, mail} = req.body;
    const worksManager = await updateWorksManager(id, firstname, lastname, mail);
    res.send(worksManager);
})

// supprime un workmanager en fonction de l'id
app.delete('/api/works_managers/:id', async (req, res) => {
    const id = req.params.id;
    const worksManager = await deleteWorksManagerById(id);
    res.send(worksManager);
})

// gestion de l'erreur : https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server running on port 8080');
})