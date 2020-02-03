// connection to mongodb
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TimeslotManager', { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((e) => {
    console.log("error");
    console.log(e);
});

// To prevent depricatation warning
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);

module.exports = { mongoose };