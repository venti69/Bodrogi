// Általunk telepített npm-csomag
const express = require('express');
const {
    getKonyvekFrontend,
} = require('../controllers/konyvekFrontendRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.get('/', getKonyvekFrontend);

// Exportálás
module.exports = router;
