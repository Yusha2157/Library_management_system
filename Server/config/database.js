const mongoose = require('mongoose')

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connection successful : ${conn.connection.host}`.cyan);

    } catch (error) {

        console.log('Mongodb Connection error : ' + error.red);
        process.exit(1);
    
    }
}

module.exports = connectDB