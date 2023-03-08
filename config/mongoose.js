// All required modules
const mongoose = require('mongoose');

// To connect the local database
mongoose.connect('mongodb://127.0.0.1:27017/contactList');

// Acquire the connection between the application and the database
const db = mongoose.connection;

// If there's an error while connecting to the database then it will throw the error
db.on('error', console.error.bind(console, 'Error while connecting to the db'));

// If application is connected successfully then this will run and print the statement in the terminal
db.once('open', function() {
    console.log('Successfully connected to the database');
});