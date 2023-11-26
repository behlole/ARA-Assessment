const invoiceController = require('../controllers/invoiceController');

const invoiceRouter = require('express').Router()
invoiceRouter.post('/', invoiceController.createInvoice);
invoiceRouter.get('/', invoiceController.getAllInvoices);
invoiceRouter.get('/:id', invoiceController.getInvoiceById);
invoiceRouter.put('/:id', invoiceController.updateInvoice);
invoiceRouter.delete('/:id', invoiceController.deleteInvoice);
invoiceRouter.post('/generate-payment-link', invoiceController.generatePaymentLink);
invoiceRouter.put('/update-payment-status/:invoiceNumber', invoiceController.updatePaymentStatus);

module.exports = invoiceRouter
