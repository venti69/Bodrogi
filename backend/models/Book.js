// Általunk telepített npm-csomag
const mongoose = require('mongoose');

// Séma kialakítása
const bookSchema = new mongoose.Schema(
    {
        cim: {
            type: String,
            required: true,
        },
        szerzo: {
            type: String,
            required: true,
        },
        ar: {
            type: Number,
            required: true,
        },
        oldalszam: {
            type: Number,
            required: true,
        },
        kep: {
            type: String,
            required: true,
        },
        tipus: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Modell létrehozása
const bookModel = mongoose.model('book', bookSchema);

// Exportálás
module.exports = bookModel;
