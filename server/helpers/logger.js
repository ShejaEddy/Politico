const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  exitOnError: false
});

module.exports = logger;
