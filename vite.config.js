import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages publica este repositorio en /FrontEnd1/.
  base: '/FrontEnd1/',
});
