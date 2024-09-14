module.exports = function(db_client){
    db_client.query(`
        CREATE TABLE IF NOT EXISTS college.teachers
        (
            id character varying COLLATE pg_catalog."default" NOT NULL,
            name character varying COLLATE pg_catalog."default" NOT NULL,
            email character varying COLLATE pg_catalog."default" NOT NULL,
            password character varying COLLATE pg_catalog."default" NOT NULL,
            image character varying COLLATE pg_catalog."default" DEFAULT 0,
            role character varying COLLATE pg_catalog."default",
            status character varying COLLATE pg_catalog."default",
            subject character varying COLLATE pg_catalog."default",
            CONSTRAINT teacher_pkey PRIMARY KEY (id)
        )
    `, (err, res) => {
        if (!err){
            console.log('User Table Created');
        }
        else {
            console.error('Error Creating User Table:', err);
        }
    });
}
