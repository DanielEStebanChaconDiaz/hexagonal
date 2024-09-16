const { validationResult } = require('express-validator');
const ProductService = require('../services/productService');

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async getProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            await this.productService.deleteProduct(req.params.id);
            res.status(204).send();
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchProducts(req, res) {
        try {
            const products = await this.productService.searchProductsByName(req.query.name);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProductStock(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.updateProductStock(req.params.id, req.body.quantity);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getProductsByCategory(req, res) {
        try {
            const products = await this.productService.getProductsByCategory(req.params.category);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProductController;