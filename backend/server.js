const express = require('express');
const app = express();
const path = require('path');

// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log(`Database connection details: ${dbHost}, ${dbUser}, ${dbName}`);
