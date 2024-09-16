const express = require('express');
const ProductController = require('../controllers/productController');
const ProductValidator = require('../validator/ProductValidator');

const router = express.Router();
const productController = new ProductController();
const productValidator = new ProductValidator();

router.get('/:id', productValidator.validateProductId(), (req, res) => productController.getProduct(req, res));
router.post('/', productValidator.validateProductData(), (req, res) => productController.createProduct(req, res));
router.put('/:id', productValidator.validateProductUpdateDataById(), (req, res) => productController.updateProduct(req, res));
router.delete('/:id', productValidator.validateProductId(), (req, res) => productController.deleteProduct(req, res));
router.get('/search', (req, res) => productController.searchProducts(req, res));



module.exports = router;  