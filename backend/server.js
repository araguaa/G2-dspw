const express = require('express');
const cors = require('cors');

const app = express();

//require('./db');

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor rodando');
});