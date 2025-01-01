// Book model lekérése.
const Book = require('../models/Book');

// Egyedi könyv megjelenítésére szolgáló oldal létrehozása és exportálása.
exports.getEgyediFrontendKonyv = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById({ _id: id });

        return res.status(200).json({ book });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
