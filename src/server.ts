import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware.js';
import { createRateLimiter } from './middleware/rateLimiter.middleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust reverse proxy (Vercel Edge Network / AWS ALB)
app.set('trust proxy', 1);

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.vercel-insights.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://vitals.vercel-insights.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter: 300 requests / minute per IP (guards against bot flood while allowing NAT campus WiFi)
const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 300,
  message: 'High traffic detected. Please wait a few seconds and refresh.',
});
app.use('/api', apiLimiter);

// Serve static frontend and assets with standard caching headers
app.use(
  express.static(publicDir, {
    maxAge: '1d',
    etag: true,
  })
);

// Mount REST API
app.use('/api', apiRouter);

// SPA Fallback: Serve index.html for all non-API GET requests
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(publicDir, 'index.html'));
  }
  next();
});

// 404 Handler for undefined API routes
app.use('/api', notFoundHandler);

// Global Error Handler
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`NEURON NET Academic Platform Server running`);
    console.log(`Department of CSE (AI & ML) | AMC Engineering College`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`API Health: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
}

export default app;
