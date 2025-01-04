// Általunk telepített npm-csomag
const express = require('express');
const {
    getFelhasznalok,
    deleteFelhasznalo,
} = require('../controllers/usersRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.get('/', getFelhasznalok);
router.delete('/:id', deleteFelhasznalo);

// Exportálás
module.exports = router;
