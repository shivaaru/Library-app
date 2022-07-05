const mongoose = require('mongoose')//Accessing mongoose package
mongoose.connect('mongodb://localhost:27017/library');//Database connection
const Schema = mongoose.Schema;//Schema definition

const AuthorSchema = new Schema({
    name: String,
    book: String,
    dob: String,
    image: String
 });
 
 var Authordata = mongoose.model('authordata',AuthorSchema);
 
 module.exports = Authordata;