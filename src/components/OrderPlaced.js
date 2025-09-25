import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderPlaced = ({ onClearCart }) => {
  useEffect(() => {
    // Clear the cart when order is placed
    onClearCart();
  }, [onClearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl"
            >
              ✅
            </motion.span>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-semibold text-gray-900">#FS-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-semibold text-gray-900">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold text-gray-900">💳 Credit Card</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl mb-2">📧</div>
              <h4 className="font-semibold text-gray-900 mb-1">Email Confirmation</h4>
              <p className="text-sm text-gray-600">Check your email for order details</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-2">📦</div>
              <h4 className="font-semibold text-gray-900 mb-1">Processing</h4>
              <p className="text-sm text-gray-600">We're preparing your order</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-2xl mb-2">🚚</div>
              <h4 className="font-semibold text-gray-900 mb-1">Shipping</h4>
              <p className="text-sm text-gray-600">Track your package delivery</p>
            </div>
          </div>
        </motion.div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h4 className="font-semibold text-gray-900">AI Fit Analysis</h4>
                <p className="text-sm text-gray-600">Perfect sizing based on your profile</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="font-semibold text-gray-900">Style Insights</h4>
                <p className="text-sm text-gray-600">Personalized recommendations</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/home"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all inline-flex items-center justify-center"
          >
            🛍️ Continue Shopping
          </Link>
          <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all inline-flex items-center justify-center">
            📧 View Order Details
          </button>
        </motion.div>

        {/* Social Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <p className="text-gray-600 mb-4">Share your experience with FitSpace.AI</p>
          <div className="flex justify-center space-x-4">
            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              📘
            </button>
            <button className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              📷
            </button>
            <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
              🐦
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@fitspace.ai" className="text-purple-600 hover:text-purple-700">
              support@fitspace.ai
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderPlaced;
