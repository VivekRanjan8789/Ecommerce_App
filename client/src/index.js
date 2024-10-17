import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/Cart';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthProvider>
    <SearchProvider>
     <CartProvider>
      <Router >
          <App />
      </Router>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);


