const bodyParser = require('body-parser');
const express = require("express");
const bcrypt=require('bcryptjs');
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const UserModel=require("./models/user");
const Bookdata = require('./src/model/Bookdata');
const app = express();
const mongoURI ='mongodb+srv://usertwo:usertwo@libraryapp.lswirdz.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority';



mongoose
   .connect('mongodb+srv://usertwo:usertwo@libraryapp.lswirdz.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then((res)=>{
     console.log("MongoDB connected");
   });
  

const store = new MongoDBSession({
    uri: mongoURI,
    collection:"mySessions",
   });

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
   
  ];//

const authorRouter = require('./src/routes/authorRoutes')(nav);
const booksRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const adminRouter1 = require('./src/routes/adminRoutes1')(nav);
const indexRouter = require('./src/routes/indexRouter')(nav);
app.set("view engine","ejs");
app.set('views','./src/views');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/authors',authorRouter);
app.use('/books',booksRouter);
app.use('/admin',adminRouter);
app.use('/admins',adminRouter1);
app.use('/users',booksRouter);
app.use('/index',indexRouter);


//app.get('/index',function(req,res){
 // res.render("index",
  // {
  //    nav,
  //    title:'Library'
  // });
  //});//
  

 


app.use(
    session({
        secret: "key that will sign cookie",
        resave: false,
        saveUninitialized: false,
        store:store,
    })
);
const isAuth=(req,res,next)=>{
 if(req.session.isAuth){
  next()
 }
 else {
  res.redirect('/login')
 }
}
app.get("/",(req,res)=>{
    res.render("landing");
});
app.get("/login",(req,res)=>{
  res.render("login");
});
app.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  const user=await UserModel.findOne({email});
  if(!user){
    return res.redirect('/login');
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.redirect('/login');
  }
  req.session.isAuth=true;
  res.redirect('/index');
});
app.get("/register",(req,res)=>{
  res.render("register");
});
app.post("/register",async(req,res)=>{
  const{username,email,password}=req.body;
  let user = await UserModel.findOne({email})
  if(user){
    return res.redirect('/register');
  }
  const hashedPsw=await bcrypt.hash(password,12);
  user=new UserModel({
    username,
    email,
    password:hashedPsw
  });
  await user.save();
  res.redirect('/login');
});
app.get("/dashboard",isAuth,(req,res)=>{
  res.render("dashboard");
});
app.get("/index",isAuth,(req,res)=>{
  res.render("index");
});
app.post('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err)throw err;
    res.redirect("/");
  });
});




app.listen(5000);