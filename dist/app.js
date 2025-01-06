"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const express_session_1 = __importDefault(require("express-session"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
require('dotenv').config();
// Import Controllers
const contactController = require('./controllers/contactController');
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT;
// Validate environment variables
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in the environment variables');
}
// Import Socket.io setup
const socket_1 = require("./socket/socket");
// Create an HTTP server
const server = http_1.default.createServer(app);
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
    }
}));
// Error Handling Middleware
app.use(errorMiddleware_1.errorHandler);
// Routes
app.use('/contact', contactRoutes_1.default);
// Initialize Socket.io for real-time messaging
(0, socket_1.initializeSocket)(server);
exports.default = app;
