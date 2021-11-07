const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Customer = mongoose.model('Customers', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default:false
    },
    name: {
        type: String,
        required: true,
        maxLength: 10,
        minLength:4
    },
    phone: {
        type: String,
        required: true,
        maxLength: 11,
        minLength:0
    },
}))

router.get('/', async (_, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})
router.post('/', async (req, res) => {
    // const { error } = customerValidataion(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body)
    let newCustomer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    newCustomer = await newCustomer.save();
    res.send(newCustomer);
})
function customerValidataion(customerData) {
    const schema = Joi.object({
        isGold: Joi.Boolean,
        name: Joi.string().min(4).required(),
        phone: Joi.string().min(0).max(11).required(),
    });
    return schema.validate(customerData);
};

module.exports = router;