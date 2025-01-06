// User model lekérése.
const User = require('../models/User');

// Általunk telepített npm-csomag
const bcrypt = require('bcrypt');

// Felhasználó beléptetése.
exports.postLogin = async (req, res) => {
    try {
        const { email, jelszo } = req.body;

        if (!email || !jelszo) {
            return res
                .status(422)
                .json({ msg: 'Minden mezőt ki kell tölteni!' });
        }

        const letezoUser = await User.findOne({ email });

        if (!letezoUser) {
            return res.status(401).json({
                msg: 'Ezekkel az adatokkal nem létezik felhasználó!',
            });
        }

        const jelszoEgyezes = await bcrypt.compare(jelszo, letezoUser.jelszo);

        if (jelszoEgyezes) {
            return res
                .status(201)
                .json({
                    msg: 'Sikeres belépés!',
                    isAdmin: letezoUser.isAdmin,
                    user: letezoUser,
                });
        } else {
            return res
                .status(403)
                .json({ msg: 'Ezekkel az adatokkal nem létezik felhasználó!' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
