const express = require("express");
const { getProducts, createProduct } = require('../controllers/productController');
const {authentication} = require('../middleware/authentication')
const {authorization} = require('../middleware/authorization ')

const router = express.Router();


