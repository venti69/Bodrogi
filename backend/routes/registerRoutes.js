// Általunk telepített npm-csomag
const express = require('express');
const { postRegister } = require('../controllers/registerRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.post('/', postRegister);

// Exportálás
module.exports = router;
