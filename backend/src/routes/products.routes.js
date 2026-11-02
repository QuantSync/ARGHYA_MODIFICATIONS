const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const asyncHandler = require('../middlewares/asyncHandler');
const { authenticate, requireAdmin } = require('../middlewares/auth');

router.get('/', asyncHandler(productController.getProducts.bind(productController)));
router.get('/slug/:slug', asyncHandler(productController.getProductBySlug.bind(productController)));
router.get('/:id', asyncHandler(productController.getProductById.bind(productController)));

// Admin product endpoints
router.post('/', authenticate, requireAdmin, asyncHandler(productController.createProduct.bind(productController)));
router.put('/:id', authenticate, requireAdmin, asyncHandler(productController.updateProduct.bind(productController)));
router.delete('/:id', authenticate, requireAdmin, asyncHandler(productController.deleteProduct.bind(productController)));

module.exports = router;
