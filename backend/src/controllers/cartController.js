class CartController {
  async getCart(req, res) {
    res.json({
      success: true,
      data: { items: [], subtotal: 0 }
    });
  }

  async syncCart(req, res) {
    res.json({
      success: true,
      data: req.body.items || [],
      message: 'Cart synced successfully'
    });
  }
}

module.exports = new CartController();
