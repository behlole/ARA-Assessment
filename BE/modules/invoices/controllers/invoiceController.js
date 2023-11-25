// controllers/invoiceController.js
const Invoice = require('../models/invoice');

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body);
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Get a specific invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }
        res.status(200).json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Update a specific invoice by ID
exports.updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedInvoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Delete a specific invoice by ID
exports.deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }
        res.status(204).send(); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
