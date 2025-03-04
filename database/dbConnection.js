const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res => {
    console.log("Database connected Succssfully with Smart parking system");
}).catch(err => {
    console.log("Database connection failed", err);
})