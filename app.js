const express = require('express');
const app = new express();
const nav = [
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link:'/admin',name:'Add Book'
    },
    {
        link:'/admins',name:'Add Author'
    },
   
];

const authorRouter = require('./src/routes/authorRoutes')(nav);
const booksRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const adminRouter1 = require('./src/routes/adminRoutes1')(nav);
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/authors',authorRouter);
app.use('/books',booksRouter);
app.use('/admin',adminRouter);
app.use('/admins',adminRouter1);
app.use('/users',booksRouter);



app.get('/',function(req,res){
    res.render("index",
     {
        nav,
        title:'Library'
     });
    });

app.listen(5030);