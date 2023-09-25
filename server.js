const express = require('express');
const app = express();
const cacheControl = require('cache-control');
//public directory
app.use(express.static('public'));
// Serve static assets from the 'public' directory with caching headers
app.use('/images', cacheControl({maxAge:3600}));

var products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99, description: 'Description for Product 1', imageName: 'iPhone 12 Pro.jpg'},
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99, description: 'Description for Product 2', imageName: 'Samsung Galaxy S21.jpg'},
    { id: 3, name: 'Sony PlayStation 5', price: 499.99, description: 'Description for Product 3', imageName: 'Sony PlayStation 5.jpg'},
    { id: 4, name: 'MacBook Pro 16', price: 2399.99, description: 'Description for Product 4', imageName: 'MacBook Pro 16.jpg'},
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99, description: 'Description for Product 5', imageName: 'DJI Mavic Air 2.jpg'},
  ];
//view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get("/", function(req, res) {
    res.render('home', { products });
  });
  app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.render('productDetail', { product });
    } else {
      res.status(404).send('Product not found');
    }
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  