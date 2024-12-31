// Book model lekérése.
const Book = require('../models/Book');

// Új könyv létrehozására szolgáló oldal lekérése és exportálása.
exports.getUjkonyv = (req, res) => {
    try {
        return res.status(200).render('ujKonyv.ejs');
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// Új könyv létrehozása az adatbázisban.
exports.postUjkonyv = async (req, res) => {
    try {
        const { cim, szerzo, ar, oldalszam, kep, tipus } = req.body;

        if (!cim || !szerzo || !ar || !oldalszam || !kep || !tipus) {
            return res
                .status(422)
                .json({ msg: 'Minden mező kitöltése kötelező!' });
        }

        const newUjKonyv = new Book(req.body);
        await newUjKonyv.save();

        return res.status(201).json({ msg: 'Sikeres új könyv feltöltés!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
