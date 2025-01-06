// Általunk telepített npm-csomag
const express = require('express');
const {
    postVasarlas,
    getVasarlasok,
} = require('../controllers/vasarlasRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.get('/', getVasarlasok);
router.post('/', postVasarlas);

// Exportálás
module.exports = router;
