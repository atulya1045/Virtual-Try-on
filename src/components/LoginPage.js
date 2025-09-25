import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    height: '',
    weight: '',
    bodyType: 'average'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const bodyTypes = [
    { value: 'slim', label: 'Slim' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'average', label: 'Average' },
    { value: 'broad', label: 'Broad' },
    { value: 'petite', label: 'Petite' },
    { value: 'curvy', label: 'Curvy' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.height) {
        newErrors.height = 'Height is required';
      } else if (formData.height < 100 || formData.height > 250) {
        newErrors.height = 'Please enter a valid height (100-250 cm)';
      }
      if (!formData.weight) {
        newErrors.weight = 'Weight is required';
      } else if (formData.weight < 30 || formData.weight > 300) {
        newErrors.weight = 'Please enter a valid weight (30-300 kg)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isLogin) {
        // Login logic
        const mockUser = {
          id: 1,
          name: 'Demo User',
          email: formData.email,
          height: 175,
          weight: 70,
          bodyType: 'athletic'
        };
        onLogin(mockUser);
      } else {
        // Signup logic
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          height: parseInt(formData.height),
          weight: parseInt(formData.weight),
          bodyType: formData.bodyType
        };
        onLogin(newUser);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-white">F</span>
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">FitSpace.AI</h1>
          <p className="text-white/70">Experience the future of fashion</p>
        </div>

        {/* Toggle Between Login/Signup */}
        <div className="flex mb-6 bg-white/10 rounded-2xl p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-xl transition-all ${
              isLogin
                ? 'bg-white text-purple-900 shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-xl transition-all ${
              !isLogin
                ? 'bg-white text-purple-900 shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (Signup only) */}
          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="👤 Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
              />
              {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
            />
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="🔑 Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
            />
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Height and Weight (Signup only) */}
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    name="height"
                    placeholder="📏 Height (cm)"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  />
                  {errors.height && <p className="text-red-300 text-sm mt-1">{errors.height}</p>}
                </div>
                <div>
                  <input
                    type="number"
                    name="weight"
                    placeholder="⚖️ Weight (kg)"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  />
                  {errors.weight && <p className="text-red-300 text-sm mt-1">{errors.weight}</p>}
                </div>
              </div>

              {/* Body Type Selection */}
              <div>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all appearance-none"
                >
                  {bodyTypes.map(type => (
                    <option key={type.value} value={type.value} className="bg-purple-900">
                      👥 {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Error Message */}
          {errors.general && (
            <p className="text-red-300 text-sm text-center">{errors.general}</p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </motion.button>
        </form>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/70 text-sm text-center mb-2">Demo Credentials:</p>
            <p className="text-white text-sm text-center">
              <strong>Email:</strong> demo@fitspace.ai<br />
              <strong>Password:</strong> demo123
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;