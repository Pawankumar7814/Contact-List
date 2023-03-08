// All require modules
const express = require('express');
const path = require('path');

// For configuration
const db = require('./config/mongoose');
const Contact = require('./model/contact');

// Creating application
const app = express();

// Setting up view engine
app.set('view engine', 'ejs');

// Setting up the port number
const port = 3200;

// setting up the webpages
app.set('Views', path.join(__dirname, 'Views'));

// Convert or parse the data into which can use at the runtime
app.use(express.urlencoded());

// Accessing the static files like css, js etc and storing and fetching images
app.use(express.static('assets'));

// ----------------- routes -----------------------------

// to view all the contacts in the database
app.get('/', async function(req, res) {
    try {
        var contact_list = await Contact.find({});
        // console.log(contact_list);
        return res.render('index', {
            title: "Contact Page",
            contacts: contact_list
        });
    } catch (err) {
        console.log(err);
        return;
    }

});

// Adding the contact to the database
app.post('/add-contact', async function(req, res) {
    try {
        var Contacts = await Contact.create({
            name: req.body.name,
            phone: req.body.contact_no
        });

        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
});

// To Delete the contact from the database
app.get('/delete-contact', async function(req, res) {
    try {
        let id = req.query.id;
        var contact = await Contact.findByIdAndDelete(id);
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }

})

// -------------- Start server ------------------------
// Creating the server
app.listen(port, function(err) {
    if (err) { console.log(err); return; }
    console.log("Express is running on ", port);
});