import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_REACT_APP_API_BASE_URL': JSON.stringify(process.env.VITE_REACT_APP_API_BASE_URL || 'https://server-s1dy.onrender.com'),
  },
});
