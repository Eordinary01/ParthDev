const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
// const bodyparser= require('body-parser');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/parth');

  // `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/parth');`    //if your database has auth enabled
}
const port = 9000;
// Define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  Email: String,
  Location: String,
  Contact: String,
  

});

const contact = mongoose.model('contact', contactSchema);





// EXPRESS  SPECIFIC STUFF
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded());



//  ENDPOINTS 

app.get('/', (req, res) => {
  const params = {}
  res.status(200).render('index.html', params);

});
/*
app.get('/home', (req, res) => {
  const params = {}
  res.status(200).render('index.html', params);

});
app.get('/about', (req, res) => {
  const params = {}
  res.status(200).render('about.html', params);

});
app.get('/work', (req, res) => {
  const params = {}
  res.status(200).render('work.html', params);

});
*/
app.get('/contact', (req, res) => {
  const params = {}
  res.status(200).render('contact.html', params);

});
 

app.post('/contact', (req, res) => {
  var myData = new contact(req.body);
  myData.save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(500).send("Item cannot be submitted");
    });
});





// Mapping the EJS template engine to ".html" files
app.engine('html', require('ejs').renderFile);


app.set('views', path.join(__dirname, 'views')); // set the views directory














// Start the server 
app.listen(port, () => {
  console.log(`This application started successfully on port ${port}`);
});