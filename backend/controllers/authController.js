const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    findByEmail,
    createUser
} = require("../models/userModel");

async function register(req, res) {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        const userExists = await findByEmail(email);

        if (userExists) {
            return res.status(400).json({
                message: "E-mail já cadastrado."
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const id = await createUser(
            username,
            email,
            hash
        );

        return res.status(201).json({
            message: "Usuário criado com sucesso!",
            id
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro interno."
        });

    }

}

async function login(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        const user = await findByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "E-mail ou senha inválidos."
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "E-mail ou senha inválidos."
            });
        }

        const token = jwt.sign(

            {
                id: user.id,
                username: user.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        return res.json({

            message: "Login realizado.",

            token,

            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro interno."
        });

    }

}

module.exports = {
    register,
    login
};