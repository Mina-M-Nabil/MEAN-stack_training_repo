const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://minamamdouh:Amc_36*R.@cluster0.ehxswuk.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Product schema
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  color: String,
  price: Number,
});

// Create a Product model
const Product = mongoose.model('Product', productSchema);

// Create an array of products
const products = [
  { id: 0, name: 'p1', color: 'red', price: 100 },
  { id: 1, name: 'p2', color: 'blue', price: 200 },
  { id: 2, name: 'p3', color: 'black', price: 300 },
];

// Create Express app
const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/home', (req, res) => {
  res.send('<b>Welcome to our APIs</b>');
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});