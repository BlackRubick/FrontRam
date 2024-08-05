import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/Routes/Routes'; // Asegúrate de importar App.jsx desde la ubicación correcta
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);
