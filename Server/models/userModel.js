const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , 'please enter your name']
    } , 
    email : {
        type : String , 
        required : [true , 'please enter email'] , 
        unique : true
    } , 
    password : {
        type : String , 
        required : [true , 'please enter your password']
    } , 
    isAdmin : {
        type : Boolean ,
        default : false 
    },
    borrowedBooks: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        borrowedAt: {
            type: Date,
            default: Date.now
        }
    }]
} , {
    timestamps : true
})

module.exports = mongoose.model('User' , userSchema)