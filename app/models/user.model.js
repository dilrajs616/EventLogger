const pool = require('@configs/database');

const User = {
    read: async (email) => {
        const { rows } = await pool.query('SELECT * FROM college.teachers WHERE email = $1', [email]);
        return rows;
    },
    add: async (id, name, email, hashedPassword, subject) => {
      const query = `
          INSERT INTO college.teachers 
          (id, name, email, password, image, role, status, subject) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      const values = [id, name, email, hashedPassword, null, 'teacher', 'kacha', subject];
      const { result } = await pool.query(query, values);
      return result;
    },
    findById : async (id) => {
        const { rows } = await pool.query('SELECT * FROM college.teachers where id=$1', [id]);
        return rows;
    },
    getIds : async() => {
        const result = await pool.query('SELECT id FROM college.teachers');
        const ids = result.rows.map(row => row.id);
        return ids;
    },
    findByStatus : async (role, status) => {
        const { rows } = await pool.query("SELECT * FROM college.teachers WHERE role=$1 AND status=$2", [role, status]);
        return rows;
    },
    deleteById : async (teacherId) => {
        try {
            const result = await pool.query("DELETE FROM college.teachers WHERE id=$1", [teacherId]);
            return result;
          } catch (error) {
            console.error('Error executing DELETE query:', error);
            throw error;
          }
    },
    acceptById : async (teacherId) => {
        try {
            const result = await pool.query("UPDATE college.teachers SET status='active' WHERE id=$1", [teacherId]);
            return result;
          } catch (error) {
            console.error('Error executing DELETE query:', error);
            throw error;
          }
    },
    // findByUsername: async (username) => {
    //     const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    //     return rows[0];
    // },
    // update: async (id, username, password, email) => {
    //     const [result] = await pool.query(
    //     'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?',
    //     [username, password, email, id]
    //     );
    //     return result;
    // },
    // delete: async (id) => {
    //     const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    //     return result;
    // }
};

module.exports = User;