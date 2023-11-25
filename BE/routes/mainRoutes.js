const express = require('express');

const authRoutes = require('../modules/auth/routes/authRoutes')
const mainRoutes = express.Router()
mainRoutes.use('/auth', authRoutes)

module.exports = mainRoutes;
