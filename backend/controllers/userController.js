const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A helper function to generate a token
// const generateToken = (id, role) => {
//     return jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
//         expiresIn: '1d', // Token expires in 1 day
//     });
// };

const generateToken = (id, name, role) => {
    return jwt.sign({ user: { id, name, role } }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};


// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user instance (role defaults to 'user')
        user = new User({ name, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Create and return token
        // const token = generateToken(user.id, user.role);

        const token = generateToken(user.id, user.name, user.role);
        res.status(201).json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return token
        // const token = generateToken(user.id, user.role);

        const token = generateToken(user.id, user.name, user.role);
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};