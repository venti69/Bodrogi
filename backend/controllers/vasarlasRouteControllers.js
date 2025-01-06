// Purchase modelek lekérése.
const Purchase = require('../models/Purchase');

// Vásárlások lekérdezése.
exports.getVasarlasok = async (req, res) => {
    try {
        const felhasznalok = await Purchase.find({}).populate('felhasznalo');
        const konyvek = await Purchase.find({}).populate('konyvek');

        return res
            .status(201)
            .render('vasarlasok.ejs', { felhasznalok, konyvek });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// Vásárlás rögzítése.
exports.postVasarlas = async (req, res) => {
    try {
        const felhasznalo = req.body.felhasznalo;
        const konyvek = [];
        const darabszam = [];

        for (let i = 0; i < req.body.adatok.length; i++) {
            konyvek.push(req.body.adatok[i].konyv);
            darabszam.push(req.body.adatok[i].db);
        }

        const newPurchase = new Purchase({ felhasznalo, konyvek, darabszam });

        await newPurchase.save();

        return res.status(201).json({ msg: 'Sikeres vásárlás!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
