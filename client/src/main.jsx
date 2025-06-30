import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/authContext'; // ✅ import your provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ wrap App here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
