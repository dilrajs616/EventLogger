const pool = require('@configs/database');

const Session = {
    read: async (id) => {
        const { rows } = await pool.query(
            'SELECT * FROM college.sessions WHERE session_id = $1 AND expiry > CURRENT_TIMESTAMP',
            [id]
        );
        return rows;
    },
    edit: async (id) => {
        const { rowCount } = await pool.query(
            'UPDATE college.sessions SET expiry = CURRENT_TIMESTAMP + INTERVAL \'2 days\', last_activity = CURRENT_TIMESTAMP WHERE session_id = $1',
            [id]
        );
        return rowCount;
    },
    add: async (session_id, user_id, user_agent, expiry) => {
        const { rowCount } = await pool.query(
            'INSERT INTO college.sessions (session_id, user_id, user_agent, expiry, last_activity) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
            [session_id, user_id, user_agent, new Date(expiry)] // Assuming expiry is already in ISO string format
        );
        return rowCount;
    },
    getSessionId: async () => {
        const { rows } = await pool.query(
            'SELECT session_id FROM college.sessions WHERE last_activity < CURRENT_TIMESTAMP - INTERVAL \'2 days\' AND terminated_at IS NULL'
        );
        return rows;
    },
    updateTerminatedAt: async (id) => {
        const { rowCount } = await pool.query(
            'UPDATE college.sessions SET terminated_at = CURRENT_TIMESTAMP WHERE session_id = $1',
            [id]
        );
        return rowCount;
    },
    delete : async(session_id) => {
        const { result } = await pool.query('DELETE FROM college.sessions WHERE session_id = $1', [session_id]);
    }
};

module.exports = Session;
