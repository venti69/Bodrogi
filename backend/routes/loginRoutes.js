// Általunk telepített npm-csomag
const express = require('express');
const { postLogin } = require('../controllers/loginRouteControllers');

// Szerver "alias" létrehozása
const router = express.Router();

router.post('/', postLogin);

// Exportálás
module.exports = router;
