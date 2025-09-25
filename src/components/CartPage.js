import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CartPage = ({ cart, user, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    // Navigate to order placed page
    window.location.href = '/order-placed';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-4"
        >
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet. Start shopping to see items here!
          </p>
          <Link
            to="/home"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all inline-block"
          >
            🛍️ Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items ({cart.length})
                  </h2>
                  <button
                    onClick={onClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    🗑️ Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 capitalize">{item.type}</p>
                        
                        {/* Color and Size */}
                        <div className="flex items-center space-x-4 mt-2">
                          {item.selectedColor && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Color:</span>
                              <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </div>
                          )}
                          {item.selectedSize && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Size:</span>
                              <span className="text-sm font-medium">{item.selectedSize}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price} each
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* User Info */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Shipping to:</h3>
                <p className="text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">
                  Height: {user.height}cm | Body: {user.bodyType}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              {shipping === 0 ? (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <span className="mr-2">🎉</span>
                    <span className="text-sm font-medium">Free shipping on orders over $100!</span>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center text-blue-700">
                    <span className="mr-2">📦</span>
                    <span className="text-sm">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </span>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-4"
              >
                💳 Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/home"
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all inline-block"
              >
                🛍️ Continue Shopping
              </Link>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span>🔒</span>
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recommended Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Sample recommended items */}
              {[
                {
                  name: 'Classic White Sneakers',
                  price: 79.99,
                  image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                },
                {
                  name: 'Leather Handbag',
                  price: 129.99,
                  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                },
                {
                  name: 'Silk Scarf',
                  price: 49.99,
                  image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                },
                {
                  name: 'Gold Watch',
                  price: 299.99,
                  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              ].map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
                        Quick Add
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-purple-600 font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
