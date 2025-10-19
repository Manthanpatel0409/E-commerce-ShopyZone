const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        // If the ID is not a valid ObjectId, it will also throw an error
        res.status(500).send('Server Error');
    }
};