require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./database/dbConnection')


const smartParkingServer = express()
smartParkingServer.use(cors())
smartParkingServer.use(express.json())
smartParkingServer.use(router)

const PORT = 3000 || process.env.PORT

smartParkingServer.listen(PORT, ()=>{
    console.log(`Smart Parking server is active in PORT : ${PORT}`);
})

smartParkingServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Smart Parking Server is active</h1>`)
})
