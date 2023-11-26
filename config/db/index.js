const mongoose = require('mongoose');

const { MONGO_URI } = process.env;


exports.connect = () => {

    mongoose.connect(`mongodb://localhost:27017/authdb`,)
        .then(() => console.log('Database connected successfully'))
        .catch((err) => console.log('Database connection failed', err))

}
