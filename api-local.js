// Local development server for testing the API
import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import {readFileSync} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

// Load environment variables
config({path: '.env.local'});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Import the handler
async function loadHandler() {
    const handlerPath = path.join(__dirname, 'api', 'extract.ts');
    const {default: handler} = await import('./api/extract.ts');
    return handler;
}

app.post('/api/extract', async (req, res) => {
    try {
        // Mock Vercel req/res objects
        const mockReq = {
            method: 'POST',
            body: req.body,
        };

        const mockRes = {
            status: (code) => {
                res.status(code);
                return mockRes;
            },
            json: (data) => {
                res.json(data);
            },
            end: (data) => {
                res.end(data);
            },
            setHeader: (key, value) => {
                res.setHeader(key, value);
            },
        };

        const handler = await loadHandler();
        await handler(mockReq, mockRes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message: error.message});
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ API Server running at http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/extract`);
    console.log(`\n🚀 Now run "npm run dev" in another terminal to start the frontend`);
});
