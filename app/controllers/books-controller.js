const express = require('express');
const router = express.Router();
const { Book } = require('../models/book');


router.get('/',function(req, res){
    Book.find().then(function(book){
        res.send(book);
    }).catch(function(err){
        res.send(err)
    })
})

router.get('/:id', function(req, res){
    let id = req.params.id;
    Book.findById(id).then(function(book){
        res.send(book)
    }).catch(function(err){
         res.send(err);
    })
})

router.post('/', function(req,res){
    let body = req.body;
    let b = new Book(body);
    b.save().then(function(book){
        res.send(book)
    }).catch(function(err){
        res.send(err);
    })
})
router.put('/:id', function(req,res){
    let body = req.body;
    let id = req.params.id;
    Book.findByIdAndUpdate(id, {$set:body},{new: true}).then(function(book){
        res.send(book);
    }).catch(function(err){
        res.send(err)
    })

})
router.delete('/:id', function(req,res){
    let id = req.params.id;
    Book.findByIdAndDelete(id).then(function(book){
        res.send({
            notice: 'Succesfully deleted'
        })
    }).catch(function(err){
        res.send(err);
    })
})

router.get('/tags/:name',function(req, res){
    let name = req.params.name;
    Book.find({tags: name}).then(function(book){
        res.send(book)
    }).catch(function(err){
        res.send(err)
        
    })   
})
router.get('/tags/', function(req, res){
   let tags = req.query.names
   let tagArray = tags.split(',')
   Book.find({tags:{$in: tagArray}}).then(function(book){
       res.send(book)
   }).catch(function(err){
       res.send(err)
   })
})   
module.exports = {
    bookmarksController: router
}