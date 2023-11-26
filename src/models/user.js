const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null, required: true },
    last_name: { type: String, default: null },
    email: { type: String, required: true },
    password: { type: String, default: null, required: true },
    age: { type: Number, default: null },
    token: {
        type: String, default: null
    }
});

userSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model("user", userSchema);