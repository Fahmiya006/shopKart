const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound. Perfect for work, travel, and everyday use.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
    category: 'Electronics',
    stock: 25,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Men\'s Running Sneakers',
    description: 'Lightweight and breathable running shoes with advanced cushioning technology. Ideal for daily training and long-distance runs.',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format',
    category: 'Footwear',
    stock: 40,
    rating: 4.2,
    numReviews: 8,
  },
  {
    name: 'Genuine Leather Backpack',
    description: 'Handcrafted genuine leather backpack with a dedicated laptop compartment, multiple pockets, and adjustable straps. Stylish and functional.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format',
    category: 'Bags',
    stock: 15,
    rating: 4.7,
    numReviews: 20,
  },
  {
    name: 'Polarized Sunglasses',
    description: 'UV400 polarized sunglasses with titanium frame. Provides superior eye protection against glare while delivering 100% UV protection.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format',
    category: 'Accessories',
    stock: 30,
    rating: 4.0,
    numReviews: 5,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life. Compatible with iOS and Android.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format',
    category: 'Electronics',
    stock: 20,
    rating: 4.6,
    numReviews: 15,
  },
  {
    name: 'Premium Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat made from natural rubber. 6mm thickness for optimal joint support. Includes carrying strap.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format',
    category: 'Fitness',
    stock: 50,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Compact TKL mechanical keyboard with RGB backlighting, Cherry MX switches, and aluminum body. Perfect for gaming and typing.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format',
    category: 'Electronics',
    stock: 18,
    rating: 4.8,
    numReviews: 30,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall insulated stainless steel bottle that keeps drinks cold 24hrs or hot 12hrs. BPA-free, leak-proof, and eco-friendly.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format',
    category: 'Fitness',
    stock: 60,
    rating: 4.3,
    numReviews: 22,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded successfully!`);

    // Create admin user
    await User.deleteMany({ email: 'admin@shop.com' });
    await User.create({
      name: 'Admin',
      email: 'admin@shop.com',
      password: 'admin123',
      isAdmin: true,
    });
    console.log('✅ Admin user created: admin@shop.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
