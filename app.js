import express from 'express';
import worksManagersRoutes from './Routes/worksManagers.js';


const app = express();
app.use(express.json());

// Routes //
app.use('/api/works_managers', worksManagersRoutes);

// gestion des erreurs copiée/collée depuis ce lien : https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
