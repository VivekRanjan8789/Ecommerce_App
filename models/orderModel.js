import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
     products: [{
        type : mongoose.ObjectId,
        ref: 'Product',
        require: true
     }],
     payment: {},
     buyer: {
        type: mongoose.ObjectId,
        ref: 'User',
        require: true
     },
     status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]
     }

    }, {timestamps: true}
)

const Order = mongoose.model('Order', orderSchema);

export default Order;

