const mongoose = require('mongoose')//Accessing mongoose package
mongoose.connect('mongodb://localhost:27017/library');//Database connection
const Schema = mongoose.Schema;//Schema definition

const BookSchema = new Schema({
   title: String,
   author: String,
   genre: String,
   image: String
});

var Bookdata = mongoose.model('bookdata',BookSchema);

module.exports = Bookdata;
