const mongoose = require('mongoose');
const customers = require('./Routers/Customers');
const express = require('express');
const app = express();
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connecting to DB'))
    .catch(err => console.error("Can't connect to the BD ", err));
app.use(express.json());
app.use('/api/customer', customers);
const port = process.env.PORT || 3800; // if we are in production environment so use the port in the server other wise use port 3800
app.listen(port, () => console.log(`Liisten to port number ${port}`));