// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const addressRoutes = require('./routes/address.routes');


app.use('/api/address', addressRoutes);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB connection error:', err));
