const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // MongoDB connection
const corsMiddleware = require('./middlewares/cors'); 

// Load environment variables from .env file
dotenv.config();

// Import routes
const addressRoutes = require('./routes/address.routes');
const apiRoutes = require('./routes/api.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Apply Middleware
app.use(...corsMiddleware);

// Import and use your routes
app.use('/api/address', addressRoutes);
app.use('/api/api', apiRoutes);
app.use('/api/user', userRoutes);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Server startup error:', err));

