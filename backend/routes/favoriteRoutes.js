const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    favorite,

    unfavorite

} = require("../controllers/favoriteController");

router.post("/:id", authMiddleware, favorite);

router.delete("/:id", authMiddleware, unfavorite);

module.exports = router;