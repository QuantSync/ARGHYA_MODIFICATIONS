const productRepository = require('../../repository/productRepository');
const { NotFoundError } = require('../../utils/errors');

class ProductService {
  async getProducts(filters) {
    return await productRepository.getAll(filters);
  }

  async getProductBySlug(slug) {
    const product = await productRepository.getBySlug(slug);
    if (!product) {
      throw new NotFoundError(`Product with slug '${slug}' not found`);
    }
    return product;
  }

  async getProductById(id) {
    const product = await productRepository.getById(id);
    if (!product) {
      throw new NotFoundError(`Product with ID '${id}' not found`);
    }
    return product;
  }

  async createProduct(productData) {
    return await productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    return await productRepository.update(id, productData);
  }

  async deleteProduct(id) {
    return await productRepository.delete(id);
  }
}

module.exports = new ProductService();
