const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  mongoDBURI: process.env.MONGODB_URI,
  port: process.env.PORT,
};