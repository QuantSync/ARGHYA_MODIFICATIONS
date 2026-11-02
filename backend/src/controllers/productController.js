const productService = require('../services/product/productService');

class ProductController {
  async getProducts(req, res) {
    const { category, search, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const result = await productService.getProducts({
      category,
      search,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      limit: parseInt(limit),
      offset
    });

    res.json({
      success: true,
      data: result.products,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        count: result.products.length
      }
    });
  }

  async getProductBySlug(req, res) {
    const product = await productService.getProductBySlug(req.params.slug);
    res.json({
      success: true,
      data: product
    });
  }

  async getProductById(req, res) {
    const product = await productService.getProductById(req.params.id);
    res.json({
      success: true,
      data: product
    });
  }

  async createProduct(req, res) {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  }

  async updateProduct(req, res) {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });
  }

  async deleteProduct(req, res) {
    await productService.deleteProduct(req.params.id);
    res.json({
      success: true,
      message: 'Product soft-deleted successfully'
    });
  }
}

module.exports = new ProductController();
