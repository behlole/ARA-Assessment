const express = require('express');

const authRoutes = require('../modules/auth/routes/authRoutes')
const invoiceRoutes = require('../modules/invoices/routes/invoiceRoutes')
const mainRoutes = express.Router()
mainRoutes.use('/auth', authRoutes)
mainRoutes.use('/invoices', invoiceRoutes)

module.exports = mainRoutes;
