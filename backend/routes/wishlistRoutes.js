const express = require("express");

const { getWishlist ,addToWishlist, removeFromWishlist,clearWishlist} = require("../controllers/wishlistController");

const authentication = require("../middleware/authentication");

const router = express.Router();


//path for All user

router.get("/",authentication,getWishlist)
router.post("/",authentication,addToWishlist)
router.delete("/:productId",authentication,removeFromWishlist)
router.delete("/",authentication,clearWishlist)
module.exports =router;