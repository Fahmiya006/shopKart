import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button onClick={() => navigate('/')} className="shop-now-btn">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="clear-btn">Clear All</button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">₹{item.price.toFixed(2)} each</p>
                </div>
                <div className="qty-controls">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="qty-btn"
                  >−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="qty-btn"
                  >+</button>
                </div>
                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                  title="Remove item"
                >✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="checkout-btn"
            >
              Proceed to Checkout →
            </button>
            <button
              onClick={() => navigate('/')}
              className="continue-btn"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}