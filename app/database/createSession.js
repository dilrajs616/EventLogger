module.exports = function(db_client){

    // db_client.query('GRANT ALL PRIVILEGES ON DATABASE ' + process.env.DB + ' TO ' + process.env.DB_USER, (err, res) => {
    //     if (!err){
    //         console.log('Granted Privileges to Vulture');
    //     }
    //     else{
    //         console.log('Error Granting Privileges to User');
    //         console.log(err);
    //     }
    // });
    // db_client.query('GRANT CREATE ON SCHEMA public TO ' + process.env.DB_USER, (err, res) => {
    //     if (!err){
    //         console.log('Granted Create Privileges to Vulture');
    //     }
    //     if(err){
    //         console.log('Error Granting Create Privileges to User');
    //         console.log(err);
    //     }
    // });
    

    db_client.query(`CREATE TABLE IF NOT EXISTS session (
    id SERIAL PRIMARY KEY ,
    user_id INT NOT NULL,
    user_agent TEXT NOT NULL,
    creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiry_time TIMESTAMP NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) )`, (err, res) => {
        if (!err){
            console.log('Session Table Created');
        }
        else{
            console.log('Error Creating Session Table');
            console.log(err);
        }
    });
}