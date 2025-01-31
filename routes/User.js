const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// 🔹 Felhasználó regisztráció
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Ellenőrizzük, hogy a felhasználó már létezik-e
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "❌ Ez az email már foglalt!" });
        }

        // Jelszó titkosítása
        const hashedPassword = await bcrypt.hash(password, 10);

        // Új felhasználó létrehozása
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "✅ Sikeres regisztráció!", user: newUser });

    } catch (err) {
        res.status(500).json({ message: "❌ Szerver hiba!", error: err.message });
    }
});

module.exports = router;
