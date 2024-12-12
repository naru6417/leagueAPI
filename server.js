const express = require('express');
const sequelize = require('./config/db.js');
const itemRoutes = require('./routes/championRoutes.js');
const cron = require('node-cron');
const env = require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', itemRoutes);

const PORT = process.env.PORT || 8000;

sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Database connection failed:', err));
