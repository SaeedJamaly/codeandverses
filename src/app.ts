import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import session  from 'express-session';
import { errorHandler } from './middlewares/errorMiddleware';
import contactRoutes from './routes/contactRoutes';

require('dotenv').config();

// Import Controllers
const contactController = require('./controllers/contactController');

const app = express();
const port = process.env.SERVER_PORT || 5000;

// Validate environment variables
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in the environment variables');
}

// Import Socket.io setup
import { initializeSocket } from './socket/socket';

// Create an HTTP server
const server = http.createServer(app);

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
    origin: frontendUrl,
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }
}));

// Error Handling Middleware
app.use(errorHandler);

// Routes
app.use('/contact', contactRoutes);

// Initialize Socket.io for real-time messaging
initializeSocket(server);

export default app;
