const invoiceController = require('../controllers/invoiceController');

const invoiceRouter = require('express').Router()
invoiceRouter.post('/', invoiceController.createInvoice);
invoiceRouter.get('/', invoiceController.getAllInvoices);
invoiceRouter.get('/:id', invoiceController.getInvoiceById);
invoiceRouter.put('/:id', invoiceController.updateInvoice);
invoiceRouter.delete('/:id', invoiceController.deleteInvoice);
module.exports = invoiceRouter
