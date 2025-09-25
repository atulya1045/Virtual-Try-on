import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = ({ user, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample product data
  const products = {
    clothes: [
      {
        id: 'c1',
        name: 'Classic Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'clothes',
        type: 'jacket',
        trending: true,
        colors: ['#4A90E2', '#2C3E50', '#E74C3C'],
        sizes: ['S', 'M', 'L', 'XL']
      },
      {
        id: 'c2',
        name: 'Casual Cotton T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'clothes',
        type: 'tshirt',
        trending: false,
        colors: ['#FFFFFF', '#000000', '#E74C3C'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'c3',
        name: 'Summer Floral Dress',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'clothes',
        type: 'dress',
        trending: true,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
        sizes: ['XS', 'S', 'M', 'L']
      },
      {
        id: 'c4',
        name: 'Business Blazer',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'clothes',
        type: 'blazer',
        trending: false,
        colors: ['#2C3E50', '#34495E', '#7F8C8D'],
        sizes: ['S', 'M', 'L', 'XL']
      }
    ],
    sunglasses: [
      {
        id: 's1',
        name: 'Aviator Classic',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'sunglasses',
        type: 'aviator',
        trending: true,
        colors: ['#FFD700', '#C0C0C0', '#000000'],
        faceTypes: ['oval', 'square', 'heart']
      },
      {
        id: 's2',
        name: 'Retro Round',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'sunglasses',
        type: 'round',
        trending: false,
        colors: ['#8B4513', '#000000', '#FF1493'],
        faceTypes: ['square', 'diamond', 'heart']
      },
      {
        id: 's3',
        name: 'Modern Wayfarer',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'sunglasses',
        type: 'wayfarer',
        trending: true,
        colors: ['#000000', '#8B4513', '#4A4A4A'],
        faceTypes: ['round', 'oval', 'square']
      },
      {
        id: 's4',
        name: 'Cat Eye Glamour',
        price: 139.99,
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        category: 'sunglasses',
        type: 'cateye',
        trending: false,
        colors: ['#FF1493', '#000000', '#8B4513'],
        faceTypes: ['round', 'heart', 'oval']
      }
    ]
  };

  const allProducts = [...products.clothes, ...products.sunglasses];

  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : activeCategory === 'clothes' 
    ? products.clothes 
    : products.sunglasses;

  const categories = [
    { id: 'all', label: 'All Products', icon: '🛍️' },
    { id: 'clothes', label: 'Clothing', icon: '👕' },
    { id: 'sunglasses', label: 'Sunglasses', icon: '🕶️' }
  ];

  const handleAddToCart = (product) => {
    onAddToCart(product);
    // Show success animation
    setSelectedItems(prev => [...prev, product.id]);
    setTimeout(() => {
      setSelectedItems(prev => prev.filter(id => id !== product.id));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: Math.random() * 80 + 20,
                height: Math.random() * 80 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">FitSpace.AI</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Hey {user.name}! Experience the future of fashion with AI-powered virtual try-on technology
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="mr-2">📷</span>
                <span>AI Try-On Available</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="mr-2">📤</span>
                <span>Upload Your Photo</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="mr-2">✨</span>
                <span>AI Recommendations</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trending Now 📈
            </h2>
            <p className="text-gray-600 text-lg">Discover the latest fashion trends with AI-powered recommendations</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Trending Badge */}
                  {product.trending && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Trending
                    </div>
                  )}

                  {/* Try-On Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <Link
                        to={`/try-on/${product.category}/${product.id}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        📷 Try On
                      </Link>
                      <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        👁️ Quick View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3 capitalize">{product.type}</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes or Face Types */}
                  <div className="mb-4">
                    {product.category === 'clothes' ? (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-sm text-gray-600">Sizes: </span>
                        {product.sizes.map(size => (
                          <span key={size} className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {size}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-sm text-gray-600">Face Types: </span>
                        {product.faceTypes.map(type => (
                          <span key={type} className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded capitalize">
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        selectedItems.includes(product.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                      }`}
                      disabled={selectedItems.includes(product.id)}
                    >
                      {selectedItems.includes(product.id) ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mr-2"
                          >
                            ✓
                          </motion.div>
                          Added!
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          🛒 Add to Cart
                        </div>
                      )}
                    </motion.button>

                    <Link
                      to={`/try-on/${product.category}/${product.id}`}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all flex items-center justify-center"
                    >
                      📷
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI Recommendations Just For You
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Based on your profile (Height: {user.height}cm, Body Type: {user.bodyType}), 
              our AI suggests these perfect matches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Sizing</h3>
              <p className="text-gray-600">AI calculates your perfect fit based on body measurements</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Try-On</h3>
              <p className="text-gray-600">See how clothes and accessories look on you instantly</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Style Matching</h3>
              <p className="text-gray-600">Personalized recommendations based on your preferences</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Shopping Experience?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start trying on clothes virtually and discover your perfect style with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/try-on/clothes/c1"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center"
            >
              📷 Try On Clothes
            </Link>
            <Link
              to="/try-on/sunglasses/s1"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all inline-flex items-center justify-center"
            >
              🕶️ Try On Sunglasses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;