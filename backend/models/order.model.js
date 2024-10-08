import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stores"
    },
    product: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    razorpayOrderId: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number
    },
    isCouponApplied: {
        type: Boolean,
        default: false
    },
    discountValue: {
        type: Number
    },
    coupon: {
        type: String
    },
    isTrackingDetailsProvided: {
        type: Boolean
    },
    trackingNo: {
        type: String
    },
    trackingPageUrl: {
        type: String
    }
}, { timestamps: true })

export const orders = mongoose.model("orders", OrderSchema)