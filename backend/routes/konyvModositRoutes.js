// Általunk telepített npm-csomag
const express = require('express');
const {
    getKonyv,
    deleteKonyv,
    updateKonyv,
} = require('../controllers/konyvModositRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.get('/:id', getKonyv);
router.put('/:id', updateKonyv);
router.delete('/:id', deleteKonyv);

// Exportálás
module.exports = router;
