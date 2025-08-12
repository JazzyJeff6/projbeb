const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const drinksController = require('./controllers/drinksController');
const registrarController = require('./controllers/registrarController');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.json());
app.post('/buscar', drinksController.buscarDrink);

app.post('/registrar', registrarController.registrarLogin);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

