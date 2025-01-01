// Általunk telepített npm-csomag
const express = require('express');
const { getKonyvek } = require('../controllers/konyvekRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.get('/', getKonyvek);

// Exportálás
module.exports = router;
