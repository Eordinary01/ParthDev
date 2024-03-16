require("dotenv").config();
console.log(process.env.DB_CONNECTION_STRING);
console.log(process.env.PORT);


const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
// const bodyparser= require('body-parser');
main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}



const port = process.env.PORT || 8200;
// Define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  Email: String,
  Location: String,
  Contact: String,
  

});

const contact = mongoose.model('#contact', contactSchema);





// EXPRESS  SPECIFIC STUFF
// app.use('/static', express.static('static')); // for serving static files
app.use(express.static(path.join(__dirname , 'static')));
app.use(express.urlencoded({extended:true}));



//  ENDPOINTS 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
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
// app.get('#Contact', (req, res) => {
//   const params = {}
//   res.status(200).render('contact.html', params);

// });
 

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


// app.set('views', path.join(__dirname, 'src/views')); // set the views directory














// Start the server 
app.listen(port, () => {
  console.log(`This application started successfully on port ${port}`);
});