// Loading MySQL module
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',       
    user: 'root',            
    password: 'Alish69y9@',  // Replace with your actual MySQL password
    database: 'crowdfunding_db'
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
    
    // Run queries once connected
    fetchFundraisersAndCategories();
});

// Function to fetch and log data from the fundraiser and category tables
function fetchFundraisersAndCategories() {
    // Fetch data from the fundraiser table
    connection.query('SELECT * FROM fundraiser', (err, fundraiserResults, fields) => {
        if (err) {
            console.error('Error fetching fundraisers:', err);
        } else {
            console.log('Fundraisers:', fundraiserResults);
        }
        
        // Fetch data from the category table only after fundraiser data is fetched
        connection.query('SELECT * FROM category', (err, categoryResults, fields) => {
            if (err) {
                console.error('Error fetching categories:', err);
            } else {
                console.log('Categories:', categoryResults);
            }
            
            // Closing the connection once both queries are done
            connection.end((err) => {
                if (err) {
                    console.error('Error closing the connection:', err);
                } else {
                    console.log('Connection closed.');
                }
            });
        });
    });
}
