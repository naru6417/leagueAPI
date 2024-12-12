const { Sequelize } = require('sequelize');
const env = require('dotenv').config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;

const sequelize = new Sequelize(database, username, password, {
    host: host, 
    dialect: 'postgres',
    define: {
        schema: 'champions'
    }
});

sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Unable to connect to PostgreSQL:', err));

module.exports = sequelize;