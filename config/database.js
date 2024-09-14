const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Could not connect to database:', err);
        process.exit(1);
    } else {
        console.log('Connected to PostgreSQL database');
        
        // Set the search path to the 'college' schema
        client.query('SET search_path TO college', (err) => {
            release();
            if (err) {
                console.error('Error setting search path:', err);
            } else {
                console.log('Search path set to college schema');
            }
        });
    }
});

module.exports = pool;
