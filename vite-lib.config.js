import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/chat-pgs/',
    build: {
        emptyOutDir: false,
        outDir: "dist",
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'chat-pgs.js'),
            name: 'ChatPGS',
            fileName: 'chat-pgs',
            formats: ['es']
        }
    }
});
