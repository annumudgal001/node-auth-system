require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connecttodb = require('./database/db.js');
const authroutes = require('./routes/authroutes.js');
const homeroutes = require('./routes/homeroutes.js');
const adminroutes = require('./routes/adminroutes.js');
const imageroutes = require('./routes/imageroutes.js');
const app = express();

connecttodb();

app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/home', homeroutes);
app.use('/api/admin', adminroutes);
app.use('/api/image', imageroutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to our API" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/api/home`);
});