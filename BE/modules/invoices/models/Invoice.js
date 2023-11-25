// models/invoice.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceIdentifier: {
        type: String,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    contactDetails: {
        type: String,
        required: true,
    },
    invoiceDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    amountDue: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        required: true,
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
