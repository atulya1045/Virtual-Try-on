import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import TryOnPage from './components/TryOnPage';
import CartPage from './components/CartPage';
import OrderPlaced from './components/OrderPlaced';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setCart([]);
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <Header 
            user={user} 
            cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
            onLogout={handleLogout}
          />
        )}
        
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? 
              <LoginPage onLogin={handleLogin} /> : 
              <Navigate to="/home" />
            } 
          />
          
          <Route 
            path="/home" 
            element={
              isAuthenticated ? 
              <HomePage 
                user={user}
                onAddToCart={addToCart}
              /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/try-on/:category/:itemId" 
            element={
              isAuthenticated ? 
              <TryOnPage 
                user={user}
                onAddToCart={addToCart}
                selectedProductId={window.location.pathname.split('/').pop()}
              /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/cart" 
            element={
              isAuthenticated ? 
              <CartPage 
                cart={cart}
                user={user}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
              /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/order-placed" 
            element={
              isAuthenticated ? 
              <OrderPlaced onClearCart={clearCart} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;