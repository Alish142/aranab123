const express = require('express');
const cors = require('cors'); // Make sure cors is required
const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors());

// Your other middleware and routes go here

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
