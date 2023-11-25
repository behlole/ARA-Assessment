// controllers/invoiceController.js
const Invoice = require('../models/invoice');
const dotenv = require('dotenv')
dotenv.config()
const key = process.env.stripe_client_key;
const stripe = require('stripe')(key);
// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body);
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error(error);

        // Check if the error is due to a duplicate key constraint
        if (error.code === 11000 && error.keyPattern && error.keyPattern.invoiceIdentifier) {
            return res.status(400).json({error: 'Invoice with the same identifier already exists.'});
        }

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

// Get an invoice by ID
exports.getInvoiceById = async (req, res) => {
    const {id} = req.params;
    try {
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }
        res.status(200).json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Update an invoice by ID
exports.updateInvoice = async (req, res) => {
    const {id} = req.params;
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedInvoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Delete an invoice by ID
exports.deleteInvoice = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(id);
        if (!deletedInvoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Generate payment link for an invoice
exports.generatePaymentLink = async (req, res) => {
    const {invoiceNumber} = req.body;

    // Fetch dynamic amount due based on the invoice number
    const dynamicAmountDue = await getDynamicAmountDue(invoiceNumber);

    if (dynamicAmountDue === null) {
        return res.status(404).json({error: 'Invoice not found'});
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Invoice #${invoiceNumber}`,
                        },
                        unit_amount: dynamicAmountDue, // Use the fetched dynamic amount
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.client_url}/success/${invoiceNumber}`,
            cancel_url: `${process.env.client_url}/cancel/${invoiceNumber}`,
        });

        res.json({paymentLink: session.url});
    } catch (error) {
        console.error('Error generating payment link:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

// Function to fetch dynamic amount due
async function getDynamicAmountDue(invoiceNumber) {
    // Replace this with your logic to fetch the dynamic amount due from your data source
    const invoice = await Invoice.findOne({invoiceIdentifier: invoiceNumber});
    return invoice ? invoice.amountDue : null;
}
