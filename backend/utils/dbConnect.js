// Általunk telepített npm-csomag
const mongoose = require('mongoose');

// Csatlakozás kiépítése
const dbConnection = mongoose.connect(process.env.MONGO_URI);

// Exportálás
module.exports = dbConnection;
