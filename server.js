import { createServer } from 'http';
import { readFileSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Handle root path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Remove query parameters
    filePath = filePath.split('?')[0];
    
    // Construct full file path
    const fullPath = join(__dirname, 'public', filePath);
    
    // Get file extension
    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    try {
        const content = readFileSync(fullPath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>404 - Not Found</title></head>
                    <body>
                        <h1>404 - File Not Found</h1>
                        <p>The requested file <code>${filePath}</code> was not found.</p>
                        <a href="/">Go back to The Referee</a>
                    </body>
                </html>
            `);
        } else {
            // Server error
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>500 - Server Error</title></head>
                    <body>
                        <h1>500 - Internal Server Error</h1>
                        <p>Something went wrong on the server.</p>
                        <a href="/">Go back to The Referee</a>
                    </body>
                </html>
            `);
        }
    }
});

server.listen(PORT, () => {
    console.log(`🏆 The Referee Web Server running at:`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://127.0.0.1:${PORT}`);
    console.log(`\nPress Ctrl+C to stop the server`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down The Referee Web Server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});