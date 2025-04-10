// logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',  // Log level
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'app.log' })  // Log to file
    ],
});

module.exports = logger;