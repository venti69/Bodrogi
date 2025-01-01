// Book model lekérése.
const Book = require('../models/Book');

// Könyvek megjelenítésére szolgáló oldal létrehozása és exportálása.
exports.getKonyvekFrontend = async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({ books });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
