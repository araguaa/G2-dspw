const db = require("../database/database");

function createPost(userId, content) {

    return new Promise((resolve, reject) => {

        db.run(

            "INSERT INTO posts (user_id, content) VALUES (?, ?)",

            [userId, content],

            function(err){

                if(err){

                    reject(err);

                }else{

                    resolve(this.lastID);

                }

            }

        );

    });

}

function getAllPosts() {

    return new Promise((resolve, reject)=>{

        db.all(

            `SELECT

                posts.id,
                posts.content,
                posts.created_at,
                users.username,

            COUNT(favorites.id) AS likes

            FROM posts

            JOIN users

            ON users.id = posts.user_id

            LEFT JOIN favorites

            ON favorites.post_id = posts.id

            GROUP BY posts.id

            ORDER BY posts.created_at DESC`,

            [],

            (err, rows)=>{

                if(err){

                    reject(err);

                }else{

                    resolve(rows);

                }

            }

        );

    });

}

module.exports = {

    createPost,

    getAllPosts

};