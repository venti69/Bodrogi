// User model lekérése.
const User = require('../models/User');

// Felhasználok megjelenítésére szolgáló oldal létrehozása és exportálása.
exports.getFelhasznalok = async (req, res) => {
    try {
        const users = await User.find({});

        return res.status(200).render('felhasznalok.ejs', { users });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// Egyedi felhasználó törlése.
exports.deleteFelhasznalo = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
