const db = require("../database/database");

function findByEmail(email) {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, row) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }

            }
        );

    });
}

function createUser(username, email, password) {
    return new Promise((resolve, reject) => {

        db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password],
            function (err) {

                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }

            }
        );

    });
}

module.exports = {
    findByEmail,
    createUser
};