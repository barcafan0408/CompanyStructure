import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js'

const path = require('path');
const PORT = process.env.PORT || serverPort;

db.setUpConnection();

const app = express();

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/companies', (req, res) => {    
    db.listCompanies().then(data => res.send(data));
});

app.post('/companies', (req, res) => {
	db.createCompany(req.body).then(data => res.send(data));        
});

app.delete('/companies/:id', (req, res) => {
	db.deleteCompany(req.params.id).then(data => res.send(data));        
});

const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});