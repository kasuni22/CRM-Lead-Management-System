import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

if (!process.env.MONGO_URI) {
  console.error('ERROR: Missing MONGO_URI environment variable. Please set it in server/.env');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not defined. Authentication will not be secure in production.');
}

const app = express();

// In production, trust first proxy when behind a load balancer or reverse proxy.
if (NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security and parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || [CLIENT_URL, 'http://localhost:5173'].includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from origin ${origin}`), false);
    },
    credentials: true,
  })
);

connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
  res.send(`CRM API is running in ${NODE_ENV} mode`);
});

// Centralized error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`Allowed client origin: ${CLIENT_URL}`);
});
