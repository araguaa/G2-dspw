const {

    addFavorite,

    removeFavorite,

    alreadyFavorited

} = require("../models/favoriteModel");

async function favorite(req,res){

    try{

        const postId = req.params.id;

        const userId = req.user.id;

        const exists = await alreadyFavorited(

            userId,

            postId

        );

        if(exists){

            return res.status(400).json({

                message:"Você já curtiu esse post."

            });

        }

        await addFavorite(

            userId,

            postId

        );

        return res.json({

            message:"Post curtido."

        });

    }catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Erro interno."

        });

    }

}

async function unfavorite(req,res){

    try{

        await removeFavorite(

            req.user.id,

            req.params.id

        );

        return res.json({

            message:"Curtida removida."

        });

    }catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Erro interno."

        });

    }

}

module.exports = {

    favorite,

    unfavorite

};