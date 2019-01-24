const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const shorthash = require('shorthash');
const bookSchema = new Schema({
     title: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return validator.isURL(value);
            },
            message: function(){
                'Invalid URL format'
            }
        }
    },
    tags: {
        type: [String]
        
    },
    hashedUrl: {
        type: String
       
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

bookSchema.pre('save', function(next){
    let book = this;
    let hash = shorthash.unique(book.originalUrl);
    book.hashedUrl = hash
    next();
})
const Book = mongoose.model('Book', bookSchema);
module.exports = {
    Book
}