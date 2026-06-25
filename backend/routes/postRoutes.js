const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    create,

    index

} = require("../controllers/postController");

router.get("/", index);

router.post("/", authMiddleware, create);

module.exports = router;