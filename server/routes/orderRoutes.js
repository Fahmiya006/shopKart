const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
} = require('../controller/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, adminOnly, updateOrderToPaid);
router.put('/:id/deliver', protect, adminOnly, updateOrderToDelivered);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;