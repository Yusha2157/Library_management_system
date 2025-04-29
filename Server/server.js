const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/database')
const port = process.env.PORT || 5000;

dotenv.config();
const app = express()

// database connection 
connectDB();


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth' , require('./routes/authRoutes'))

app.listen(port , () => {
    console.log(`Starting backend server at port : ${port}`.blue);
})