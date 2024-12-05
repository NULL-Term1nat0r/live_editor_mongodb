const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = 'mongodb://root:rootpassword@mongo:27017/documentDB?authSource=admin'; // Update with your MongoDB connection string

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests for development

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a Mongoose schema and model for the document
const documentSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

const Document = mongoose.model('Document', documentSchema);

// API endpoint to fetch the document content
app.get('/document', async (req, res) => {
  console.log('GET request to /document');
  try {
    const document = await Document.findOne();
    if (document) {
      res.json({ content: document.content });
    } else {
      res.json({ content: '' }); // If no document is found
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Error fetching document' });
  }
});

// API endpoint to save the document content
app.post('/document', async (req, res) => {
  console.log('POST request to /document');
  console.log('Request body:', req.body);

  if (req.body.content === undefined) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    // Update or create the document content
    const document = await Document.findOneAndUpdate(
      {}, // Find the first document (if exists)
      { content: req.body.content },
      { new: true, upsert: true } // Create a new one if no document exists
    );
    res.status(200).send('Content saved successfully');
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ error: 'Error saving document' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
