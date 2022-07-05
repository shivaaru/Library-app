const express = require('express');
const adminRouter1 = express.Router();
const Authordata = require('../model/Authordata');
function router(nav){
    adminRouter1.get('/',function(req,res){
        res.render('addAuthor',{
            nav,
            title:'Library'
        })
      
       
    })
    
    
    adminRouter1.post('/adds',function(req,res){
       var item = {
       name: req.body.name,
       book: req.body.book,
       dob: req.body.dob,
       image: req.body.image
       }
       
       
     var author = Authordata(item);
     author.save();//saving to database
     res.redirect('/authors');
    });
   

    return adminRouter1;
}


module.exports = router;