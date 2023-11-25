const express = require('express')
const mongoose = require('mongoose');
const mainRoutes = require("./routes/mainRoutes");
const responseMappings = require("./utils/responseMappings");
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/', mainRoutes)
app.use("**", (req, res) => {
    return responseMappings.getErrorMessage(res, `Route ${req.route} not found`);
})

const port = process.env.port || 3000;
app.listen(port, async () => {
    console.log("Server is running on port", port);
    await mongoose.connect('mongodb://127.0.0.1:27017/Finance');
})
