const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoUri = 'mongodb://localhost:27017/kcoin';
function connect() {
  return mongoose.connect(mongoUri, { useMongoClient: true });
}

module.exports = {
  connect,
  mongoose
};