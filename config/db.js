const { connect } = require('mongoose');

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Export the connectDB function using CommonJS syntax
module.exports = connectDB;
