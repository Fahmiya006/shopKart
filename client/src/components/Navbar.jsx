import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🛒</span>
        <span className="brand-text">ShopKart</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>

        <Link to="/cart" className="nav-link cart-link">
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>

        {user ? (
  <>
    {user?.isAdmin && (
      <Link to="/admin" className="nav-link" style={{ color: '#ff4757', fontWeight: 700 }}>
        ⚡ Admin
      </Link>
    )}
    <Link to="/orders" className="nav-link">My Orders</Link>
    <span className="nav-username">Hi, {user.name.split(' ')[0]}!</span>
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login" className="nav-link">Login</Link>
    <Link to="/register" className="btn-register">Register</Link>
  </>
)}
      </div>
    </nav>
  );
}