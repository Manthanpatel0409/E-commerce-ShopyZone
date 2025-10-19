// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// // Import routes
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes'); // <-- Import user routes

// // Initialize the express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // --- Database Connection ---
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('MongoDB connected successfully!');
//     } catch (error) {
//         console.error('MongoDB connection failed:', error.message);
//         process.exit(1);
//     }
// };
// connectDB();
// // -------------------------

// // Middleware
// app.use(cors());
// app.use(express.json());

// // --- Use Routes ---
// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes); // <-- Use the user routes

// // A simple test route
// app.get('/', (req, res) => {
//     res.send('E-Commerce API is running...');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes'); // <-- Import order routes

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;

// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};
connectDB();
// -------------------------

// Middleware
app.use(cors());
app.use(express.json());

// --- Use Routes ---
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); // <-- Use the order routes

// A simple test route
app.get('/', (req, res) => {
    res.send('E-Commerce API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});