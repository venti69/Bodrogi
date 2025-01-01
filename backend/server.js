// Szükséges CommonJS npm-csomagok beimportálása
const path = require('node:path'); // útvonal beállításokhoz
const fsPromises = require('node:fs/promises'); // filekezeléshez

// Általunk telepített npm-csomagok
require('dotenv').config(); // környezeti változókhoz (.env állomány)
const cors = require('cors'); // server/kliens kommunikációhoz
const ejs = require('ejs'); // view engine beállításához
const express = require('express'); // szerveralkalmazás létrehozásához

// Szerveralkalmazás létrehozása
const PORT = process.env.PORT || 5000; // környezeti változó (.env állományból)
const app = express(); // szerverpéldány létrehozása

// Middleware-k
app.set('view engine', 'ejs'); // view engine beállítása
app.use(express.static(path.resolve(__dirname, 'public'))); // statikus mappa
app.use(cors()); // server/kliens kommunikáció alap beállítása
app.use(express.json()); // body-parser beállítása, űrlap elemek feldolgozásához

// main route beállítása
app.get('/', (req, res) => {
    try {
        return res.status(200).render('index.ejs');
    } catch (error) {
        return res
            .status(500)
            .json({ msg: `Valami hiba történt: ${error.message}` });
    }
});

// route-ok beállítása
app.use('/ujkonyv', require('./routes/ujKonyRoutes'));
app.use('/konyvek', require('./routes/konyvekRoutes'));
app.use('/konyvek-frontend', require('./routes/konyvekFrontendRoutes'));
app.use('/konyvmodosit', require('./routes/konyvModositRoutes'));
app.use('/konyvegyedifrontend', require('./routes/egyediFrontendRoutes'));

// Adatbázis csatlakozás
let dbconnection = require('./utils/dbConnect');

dbconnection
    .then(() => {
        console.log('Sikeres adatbázis csatlakozás!');
        // Szerveralkalmazás figyelőmódba állítása
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
