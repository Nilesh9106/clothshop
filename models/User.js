const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model('User', UserSchema);