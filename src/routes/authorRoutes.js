const express = require('express');
const authorRouter = express.Router();
const Authordata = require('../model/Authordata')
function router(nav){
    //var authors =[
       // {
        //    name: 'J K Rowling',
        //    book: 'Harry Potter',
        //    dob: '31st july 1965'
        //},
        //{
        //    name: 'Joseph Barbera',
        //    book: 'Tom and Jerry',
        //    dob: '24th march 1911'
              
        //},
        //{
        //    name: 'Basheer',
        //    book: 'Paathumayude Aadu',
        //    dob: '21 jan 1908'  
        //}
    //]
    
    authorRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors",{
                nav,
                title:'Library',
                authors
        
        })
       
        })
    })
    authorRouter.get('/:id',function(req,res){
        const id = req.params.id
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render('author',{
                nav,
                title:'Library',
                author//: authors[]//
            });
        });
    });
    
    return authorRouter;

}

module.exports =router;