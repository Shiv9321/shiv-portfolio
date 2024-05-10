import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Getting the directory name from the URL of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    mode: 'development'
};
