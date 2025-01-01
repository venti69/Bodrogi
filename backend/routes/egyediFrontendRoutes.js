// Általunk telepített npm-csomag
const express = require('express');
const {
    getEgyediFrontendKonyv,
} = require('../controllers/egyediFrontendRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.get('/:id', getEgyediFrontendKonyv);

// Exportálás
module.exports = router;
