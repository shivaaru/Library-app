const mongoose = require('mongoose')//Accessing mongoose package
mongoose.connect('mongodb+srv://usertwo:usertwo@libraryapp.lswirdz.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');//Database connection
const Schema = mongoose.Schema;//Schema definition

const AuthorSchema = new Schema({
    name: String,
    book: String,
    dob: String,
    image: String
 });
 
 var Authordata = mongoose.model('authordata',AuthorSchema);
 
 module.exports = Authordata;
 