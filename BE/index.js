const express = require('express');

const app = express();
app.use(express.json())
app.use('/', (req, res) => {
    console.log("Server is running ");
})

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Server is running on port", port);
})
