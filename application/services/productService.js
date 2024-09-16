const ProductRepository = require('../../domain/repositories/productRepository');

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProductById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return product;
    }

    async createProduct(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.productRepository.save(data);
    }

    async updateProduct(id, data) {
        const updatedProduct = await this.productRepository.updateById(id, data);
        if (!updatedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be updated'}));
        }
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await this.productRepository.deleteById(id);
        if (!deletedProduct) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be deleted'}));
        }        
        return deletedProduct;
    }
    
    async searchProductsByName(name) {
        return await this.productRepository.searchByName(name);
    }

    async updateProductStock(id, quantity) {
        const product = await this.getProductById(id);
        const newStock = product.stock + quantity;
        if (newStock < 0) {
            throw new Error(JSON.stringify({status: 400, message: 'Insufficient stock'}));
        }
        return await this.updateProduct(id, { stock: newStock });
    }

    async getProductsByCategory(category) {
        return await this.productRepository.getByCategory(category);
    }
}

module.exports = ProductService;