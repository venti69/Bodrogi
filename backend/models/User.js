// Általunk telepített npm-csomag
const mongoose = require('mongoose');

// Séma kialakítása
const userSchema = new mongoose.Schema(
    {
        nev: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        jelszo: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

// Modell létrehozása
const userModel = mongoose.model('user', userSchema);

// Exportálás
module.exports = userModel;
