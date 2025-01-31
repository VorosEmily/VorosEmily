require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 API útvonalak betöltése (FONTOS, hogy ez az app.use ELŐTT legyen!)
const userRoutes = require('./routes/user');

// 🔹 API végpont bekapcsolása
app.use('/api/users', userRoutes);

// 🔹 Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Szerver fut: http://localhost:${PORT}`);
});

