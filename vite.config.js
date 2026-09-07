import { defineConfig } from 'vite';
import { sites } from '@openai/sites-vite-plugin';
import { resolve } from 'node:path';
export default defineConfig({plugins:[sites()],publicDir:false,build:{outDir:'dist/client',emptyOutDir:true,rollupOptions:{input:{main:resolve(import.meta.dirname,'index.html'),admin:resolve(import.meta.dirname,'admin.html')}}}});
