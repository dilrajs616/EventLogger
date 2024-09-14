const pool = require('@configs/database');

const Subjects = {
    read: async () => {
        try {
            const { rows } = await pool.query('SELECT name FROM college.subjects');
            return rows.map(row => row.name);
        } catch (error) {
            console.error('Error reading subjects:', error);
            throw error;
        }
    }
};

module.exports = Subjects;
