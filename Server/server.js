const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/database')
const cors = require('cors');
const port = process.env.PORT || 5000;

dotenv.config();
const app = express()

// database connection 
connectDB();


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth' , require('./routes/authRoutes'))
app.use('/api/admin' , require('./routes/adminRoutes'))
app.use('/api/books' , require('./routes/bookRoutes'))
app.use('/api/rfid' , require('./routes/rfidRoutes'))

app.listen(port , () => {
    console.log(`Starting backend server at port : ${port}`.blue);
})