// Book model lekérése.
const Book = require('../models/Book');

// Egyedi könyv megjelenítésére szolgáló oldal létrehozása és exportálása.
exports.getKonyv = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById({ _id: id });

        return res.status(200).render('konyvModosit.ejs', { book });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// Egyedi könyv frissítése.
exports.updateKonyv = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndUpdate({ _id: id }, req.body);

        return res.status(200).json({ msg: 'Sikeres frissítés!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// Egyedi könyv törlése.
exports.deleteKonyv = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete({ _id: id });

        return res.status(200).json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
