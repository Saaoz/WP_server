import express from 'express';
import worksManagers from './Routes/worksManagers.js';
import addresses from './Routes/addresses.js';
import workSites from './Routes/workSites.js';
import orderSheets from './Routes/orderSheets.js';
import foldings from './Routes/foldings.js';
import suppliers from './Routes/suppliers.js'


const app = express();
app.use(express.json());

// Routes //
app.use('/api/works_managers', worksManagers);
app.use('/api/addresses', addresses);
app.use('/api/work_sites', workSites);
app.use('/api/order_sheets', orderSheets);
app.use('/api/foldings', foldings);
app.use('/api/suppliers', suppliers)

// gestion des erreurs copiée/collée depuis ce lien : https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
