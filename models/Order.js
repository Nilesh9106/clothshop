const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    OrderId: { type: String, unique: true, required: true },
    Email: { type: String },
    Products: { type: Object, required: true },
    Address: { type: String, required: true },
    PinCode: { type: String, required: true },
    Phone: { type: String, required: true },
    Amount: { type: Number, required: true },
    Status: { type: String, default: 'Pending', required: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model('Order', OrderSchema);