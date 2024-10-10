const express = require('express');
const cors = require('cors'); // Import CORS
const path = require('path');
const apiRoutes = require('../serverside/controller/routes/api');

const app = express();
const port = 8080;

// Middleware for CORS
app.use(cors({
    origin: 'http://127.0.0.1:3000',  // Allow requests from your frontend running on port 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

//middleware to parse JSon and Url-encoded data
app.use(express.json()); // To parse JSON in request body
app.use(express.urlencoded({ extended: true }));
// Middleware for static files
app.use(express.static(path.join(__dirname, '../clientside')));

// Use the API routes with a URL prefix
app.use('/api', apiRoutes);

// Serve HTML files from clientside folder
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../clientside/index.html'));
});

app.get('/fundraiser', (req, res) => {
    res.sendFile(path.join(__dirname, '../clientside/fundraiser.html'));
});

app.get('/categories', (req, res) => {
    res.sendFile(path.join(__dirname, '../clientside/categories.html'));
});

app.get('/donation', (req, res) => {
    res.sendFile(path.join(__dirname, '../clientside/donation.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
