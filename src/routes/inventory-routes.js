const express = require('express');
const router = express.Router();

const data = [
    {product: 'iPhone 11', price: 120000, stock: 150 },
    {product: 'Xiomi Redmi Note 5', price: 10000, stock: 250 },
    {product: 'Micromax A1', price: 7000, stock: 30 },
    {product: 'Lenovo', price: 10000, stock: 150 }
];

router.get('/', (req, res) => {
    
    res.json(data);  
});

module.exports = router;