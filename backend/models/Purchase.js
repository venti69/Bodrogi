// Általunk telepített npm-csomag
const mongoose = require('mongoose');

// Séma kialakítása
const purchaseSchema = new mongoose.Schema(
    {
        felhasznalo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        konyvek: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'book',
            },
        ],
        darabszam: [
            {
                type: Number,
            },
        ],
    },
    { timestamps: true }
);

// Modell létrehozása
const purchaseModel = mongoose.model('purchase', purchaseSchema);

// Exportálás
module.exports = purchaseModel;
