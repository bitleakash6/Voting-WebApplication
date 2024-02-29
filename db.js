const mongoose = require('mongoose');
require('dotenv').config();


//Define the MangoDb connection url

const mongoURL = process.env.MONGODB_URL_LOCAL // Replace 'mydatabase' with your database name
//const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//Get the default connection
// Mongoose maintains a default connection object representing the MangoDB connection.
const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MangoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error : ', err);
});

db.on('disconnected', ()=>{
    console.log('MongoDB diConnected');
});

//Export the database connection 

module.exports = db;

