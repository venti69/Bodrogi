// User model lekérése.
const User = require('../models/User');

// Általunk telepített npm-csomag
const bcrypt = require('bcrypt');

// Felhasználó regisztrálása.
exports.postRegister = async (req, res) => {
    try {
        const { nev, email, jelszo } = req.body;

        if (!nev || !email || !jelszo) {
            return res
                .status(422)
                .json({ msg: 'Minden mezőt ki kell tölteni!' });
        }

        const emailformat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailformat.test(email)) {
            return res.status(422).json({
                msg: 'Nem megfelelő e-mail cím!',
            });
        }

        if (jelszo.length < 6) {
            return res.status(422).json({
                msg: 'A jelszónak legalább 6 karakter hosszúnak kell lennie!',
            });
        }

        const letezoUser = await User.findOne({ email });

        if (letezoUser) {
            return res.status(409).json({
                msg: 'Ezzel az e-mail címmel már létezik felhasználó!',
            });
        }

        const hashedPassword = await bcrypt.hash(jelszo, 10);
        const newUser = new User({ nev, email, jelszo: hashedPassword });
        await newUser.save();

        return res.status(201).json({ msg: 'Sikeres regisztráció!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
