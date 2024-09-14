const pool = require('@configs/database');

const Event = {
    read : async(teacherId) => {
        const { rows } = await pool.query('select * from college.events where teacher_id = $1', [teacherId]);
        return rows;
    },
    add : async(id, teacherId, name, host_name, date, topic, certificatePath) => {
        const query = `
            INSERT INTO college.events (id, teacher_id, name, host, date, topic, certificate)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        const values = [id, teacherId, name, host_name, date, topic, certificatePath];

        const { result } = await pool.query(query, values);

        return result;
    },
    get : async() => {
        const { rows } = await pool.query('select * from college.events');
        return rows;
    }
};

module.exports = Event;