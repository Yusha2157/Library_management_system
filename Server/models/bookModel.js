const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    rfid_tag : {
        type : String , 
        required : true,
        unique : true
    } , 
    name : {
        type : String , 
        required : [true , "Please enter book name!"] 
    } , 
    author : {
        type : String
    } , 
    isbn : {
        type : String , 
        unique : true
    } 
    ,
    category : {
        type : String
    } , 
    publication_year : {
        type : Number
    } , 
    cover_image : {
        type : String
    } , 
    description : {
        type : String
    } , 
    status : {
        type : String , 
        default : 'availiable'
    } 
} , {
    timestamps : true
});

module.exports = mongoose.model('Book' , BookSchema);