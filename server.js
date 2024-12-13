const express = require('express');
const sequelize = require('./config/db.js');
const championRoutes = require('./routes/championRoutes.js');
const aramRoutes = require('./routes/aramRoutes.js');
const cron = require('node-cron');
const env = require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', championRoutes);
app.use('/api', aramRoutes);

const PORT = process.env.PORT || 8000;

sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Database connection failed:', err));
