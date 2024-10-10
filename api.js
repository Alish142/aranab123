const express = require('express');
const router = express.Router(); // Create a router

// MySQL Database Connection (You can keep this in a separate db.js if needed)
const db = require('../../db'); // Or keep db logic in your server file


router.get("/home", (req, res) => {
  const sql = `
      SELECT F.*, C.name AS category_name
      FROM fundraiser F
      JOIN category C ON F.category_id = C.category_id
      WHERE F.is_active = 1
  `;
  db.query(sql, (err, results) => {
      if (err) {
          console.error("Error fetching fundraisers:", err);
          return res.status(500).json({ message: "Error fetching fundraisers" });
      }
      res.json(results);
  });
});

// GET method to retrieve all categories
router.get("/categories", (req, res) => {
  const sql = 'SELECT * FROM category';
  db.query(sql, (err, results) => {
      if (err) {
          console.error("Error fetching categories:", err);
          return res.status(500).json({ message: "Error fetching categories" });
      }
      res.json(results);
  });
});

router.get("/search", (req, res) => {
  const { categoryId } = req.query;
  console.log("Category ID received:", categoryId); // Log the categoryId

  const sql = `
      SELECT F.*, C.name AS category_name
      FROM fundraiser F
      JOIN category C ON F.category_id = C.category_id
      WHERE F.is_active = 1 AND (C.category_id = ? OR ? IS NULL)
  `;

  db.query(sql, [categoryId, categoryId], (err, results) => {
      if (err) {
          console.error("Error fetching fundraisers:", err);
          return res.status(500).json({ message: "Error fetching fundraisers" });
      }

      console.log("Results from database:", results); // Log the query results
      res.json(results);  // Return the results as JSON to the frontend
  });
});



// POST method to insert a new donation
router.post("/donations", (req, res) => {
  const { fundraiser_id, amount } = req.body;
  console.log("Received donation request:", req.body); // Log the request body
  
  if (!fundraiser_id || !amount) {
    console.error("Missing fundraiser_id or amount in request body");
    return res.status(400).json({ message: "Missing fundraiser_id or amount" });
  }

  const sql = 'INSERT INTO donation (fundraiser_id, amount) VALUES (?, ?)';
  db.query(sql, [fundraiser_id, amount], (err, result) => {
      if (err) {
          console.error("Error inserting donation:", err);
          return res.status(500).json({ message: "Error inserting donation" });
      }
      res.status(201).json({ message: 'Donation added', donationId: result.insertId });
  });
});


// GET all fundraisers
router.get('/fundraiser', (req, res) => {
  const query = 'SELECT * FROM FUNDRAISER';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching fundraisers:', err);
      res.status(500).send('Error fetching fundraisers');
      return;
    }
    res.json(results);
  });
});

router.post('/fundraisers', (req, res) => {
  const { organizer_name, description, target_funding, current_funding, city, is_active, category_id } = req.body;
  const query = 'INSERT INTO fundraiser (organizer_name, description, target_funding, current_funding, city, is_active, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [organizer_name, description, target_funding, current_funding, city, is_active, category_id], (err, result) => {
    if (err) {
      console.error('Error creating fundraiser:', err);
      res.status(500).send('Error creating fundraiser');
      return;
    }
    res.json({ id: result.insertId });
  });
});

// Update a fundraiser
router.put('/fundraiser/:id', (req, res) => {
  const { id } = req.params;
  const { organizer_name, description, target_funding, current_funding, city, is_active, category_id } = req.body;

  const query = `
    UPDATE fundraiser
    SET
      organizer_name = ?,
      description = ?,
      target_funding = ?,
      current_funding = ?,
      city = ?,
      is_active = ?,
      category_id = ?
    WHERE fundraiser_id = ?
  `;

  db.query(query, [organizer_name, description, target_funding, current_funding, city, is_active, category_id, id], (err, result) => {
    if (err) {
      console.error('Error updating fundraiser:', err);
      res.status(500).send('Error updating fundraiser');
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Fundraiser not found' });
    }

    res.json(result);
  });
});

// Delete a fundraiser (and related donations)
router.delete('/fundraisers/:id', (req, res) => {
  const { id } = req.params;

    // After deleting related donations, delete the fundraiser
    const deleteFundraiserQuery = 'DELETE FROM fundraiser WHERE fundraiser_id = ?';
    db.query(deleteFundraiserQuery, [id], (err, result) => {
      if (err) {
        console.error('Error deleting fundraiser:', err);
        return res.status(500).send('Error deleting fundraiser');
      }

      res.json({ message: 'Fundraiser and related donations deleted successfully' });
    });
  });

module.exports = router; // Export the router so it can be used in server.js
