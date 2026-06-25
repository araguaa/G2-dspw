const {

    createPost,

    getAllPosts

} = require("../models/postModel");

async function create(req, res){

    try{

        const { content } = req.body;

        if(!content){

            return res.status(400).json({
                message:"Digite algum texto."
            });

        }

        const id = await createPost(

            req.user.id,

            content

        );

        return res.status(201).json({

            message:"Post criado.",

            id

        });

    }catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Erro interno."

        });

    }

}

async function index(req,res){

    try{

        const posts = await getAllPosts();

        return res.json(posts);

    }catch(error){

        console.error(error);

        return res.status(500).json({

            message:"Erro interno."

        });

    }

}

module.exports = {

    create,

    index

};