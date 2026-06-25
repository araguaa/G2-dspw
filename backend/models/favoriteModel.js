const db = require("../database/database");

function addFavorite(userId, postId) {

    return new Promise((resolve, reject) => {

        db.run(

            "INSERT INTO favorites (user_id, post_id) VALUES (?, ?)",

            [userId, postId],

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

function removeFavorite(userId, postId){

    return new Promise((resolve, reject)=>{

        db.run(

            "DELETE FROM favorites WHERE user_id = ? AND post_id = ?",

            [userId, postId],

            function(err){

                if(err){

                    reject(err);

                }else{

                    resolve();

                }

            }

        );

    });

}

function alreadyFavorited(userId, postId){

    return new Promise((resolve,reject)=>{

        db.get(

            "SELECT * FROM favorites WHERE user_id = ? AND post_id = ?",

            [userId,postId],

            (err,row)=>{

                if(err){

                    reject(err);

                }else{

                    resolve(row);

                }

            }

        );

    });

}

module.exports = {

    addFavorite,

    removeFavorite,

    alreadyFavorited

};