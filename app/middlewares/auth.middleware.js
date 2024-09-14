const Session = require('@models/session.model');

const authenticate = async (req, res, next) => {
    const { session_id } = req.cookies;
    if (!session_id) {
        return res.status(401).redirect('/login');
    }
    try {
        const rows = await Session.read(session_id);
        if (rows.length === 0) {
            return res.status(401).redirect('/login');
        }
        await Session.edit(session_id);
        req.user = { id: rows[0].user_id };
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('');
        return res.status(500).redirect(`/redirect?message=${error}`);
    }
};

const terminateInactiveSessions = async () => {
    try {
        const rows = await Session.getSessionId();
        for (const row of rows) {
            await Session.updateTerminatedAt(row.session_id);
        }
        console.log(`Terminated ${rows.length} inactive sessions`);
    } catch (error) {
        console.error('Error terminating inactive sessions:', error);
    }
};
setInterval(terminateInactiveSessions, 30 * 60 * 1000);

module.exports = authenticate;