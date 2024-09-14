const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    port: process.env.DB_PORT,

});

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to DB');

        // Set the search path to the 'college' schema
        await client.query('SET search_path TO college');
    } catch (err) {
        console.log('Error Connecting to DB');
        console.log(err);
    }
}

// Call the connectDB function to initiate the connection
connectDB();

module.exports = client;