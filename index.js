require ('dotenv').config()
const express= require('express')
const app = express()
const port= 4000
const mongoose = require('mongoose')
const customerRouter = require('./routes/customerRouter')
//establishing a connection to the db
// const dbUri =
// "mongodb+srv://ishorunmu:test123@cluster0.cixzjsa.mongodb.net/?retryWrites=true&w=majority"
//establishing a connection to the db

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log("server running and db connected... : $");
            })
            
    }catch (error) {
        console.log(error);
    }; 
};
connectDb();
// middlewares
app.use(express.json())
const requestLogger = (req,res, next) =>{
    const logger ={
    url: req.url,
    method: req.method,
    year: new Date().getFullYear(),
    };
    console.log(logger);
    next();
};
app.use(requestLogger);

const auth =(req,res,next)=>{
    const isLoggedin = false;
    if (isLoggedin) {
        next();
    }else {
        res.status(401).send("You are not logged in");
    }
}
app.use('/api/customers',customerRouter)
// routes and path
app.get("/",(req,res)=>{
    res.status(200).send('<h1>Welcome to the home page</h1>')
})
app.get("/contact",(req,res)=>{
    res.status(200).send("<h2>Contact Form</h2>")
})
app.get("/dashboard",auth, (req,res)=>{
    res.status(200).send("<h2>Dashboard</h2>")
})
// error route
app.get("*",(req,res)=>{
    res.status(404).send(`<h1>Error page </h1> <a href="/"> Go back home</a>`)
})




