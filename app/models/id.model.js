const pool = require('@configs/database');

const idNum = {
    read: async (id) => {
        const { rows } = await pool.query('SELECT count FROM college.count WHERE id = $1', [id]);
        return rows[0].count;
    },
    add: async(num, id) => {
        const { result } = pool.query('UPDATE college.count SET count=$1 WHERE id=$2', [num, id])
        return result;
    }
}

module.exports = idNum;