const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser=require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 3000;


//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    Address: String,
    age: String,
});

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({extended: true}))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'view')) // Set the views directory

app.listen(3000, function() {
    console.log("Server is running on port " + 3000);
});

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Item has been saved to database.")
    }).catch(()=>{
        res.status(400).send("Item has not been save to database.")
    });
    // res.status(200).render('contact.pug', params);
})
