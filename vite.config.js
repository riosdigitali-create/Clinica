import { defineConfig } from 'vite';
import { sites } from '@openai/sites-vite-plugin';
export default defineConfig({plugins:[sites()],publicDir:false,build:{outDir:'dist/client',emptyOutDir:true,rollupOptions:{input:'index.html'}}});
