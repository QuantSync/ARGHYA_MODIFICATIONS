const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const productsRoutes = require('./products.routes');
const ordersRoutes = require('./orders.routes');
const cartRoutes = require('./cart.routes');
const paymentsRoutes = require('./payments.routes');
const webhooksRoutes = require('./webhooks.routes');
const adminRoutes = require('./admin.routes');
const awsRoutes = require('./aws.routes');

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/cart', cartRoutes);
router.use('/payments', paymentsRoutes);
router.use('/webhooks', webhooksRoutes);
router.use('/admin', adminRoutes);
router.use('/aws', awsRoutes);
router.use('/upload', awsRoutes);

module.exports = router;
