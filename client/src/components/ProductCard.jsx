import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
    };
  

  const stars = (rating) => {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">
          {product.description.length > 90
            ? product.description.substring(0, 90) + '...'
            : product.description}
        </p>
        <div className="product-rating">
          <span className="stars">{stars(product.rating)}</span>
          <span className="review-count">({product.numReviews})</span>
        </div>
        <div className="product-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="btn-add-cart"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}