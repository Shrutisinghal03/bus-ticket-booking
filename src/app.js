const myJson = require("../public/apis/routes.json");
const session = require("express-session");
const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
const moment = require('moment');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")))
app.set('view engine', "hbs");
require("./db/conn");

const mongomodel = require("../src/models/user");
const passenger = mongomodel.passenger;
const seat = mongomodel.seat; 
app.use(session({
  secret: "helloohii1234",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 * 5 }
}))
app.get("/", (req, res) => {
  res.render('home');
})
app.get("/Travel",(req,res)=>{
  res.render('index'); 
})
app.post("/Travel", (req, res) => {
  console.log(req.body);

  res.render('buses', { source: req.body.fname, dest: req.body.lname,date:req.body.date });
})
app.post("/bookseat",async(req,res)=>{

  const text = req.body;

  for (i = 0 ; i < text.seats.length ;  i++){
    let data={
      email:req.session.email,
      busNumber:text.bid,
      seatNumber:text.seats[i]
    }
    const obj2=new seat(data); 
    const result = await obj2.save();
  }

  // let data={
  //   email:req.session.email,
  //   busNumber:req.query.bid,
  //   seatNumber:req.query.seat
  // }
  // const obj2=new seat(data); 
  // const result = await obj2.save();
  // res.redirect(`/seats?bid=${req.query.bid}`)

  res.send ({status : "success"});
})
app.get("/getseatdata",async(req,res)=>{
 const result= await  seat.find({busNumber:req.query.bid});
 let seats=[]; 
 if(result.length==0)
 {
  res.send([]); 
  return; 
 }

 result.map((item)=>{
  console.log(item); 
  seats.push(item); 
 })
 res.send(seats); 
})

app.get("/seats", async(req, res) => { 

//  const seatNumber=result.map((e)=>{
//   console.log(e);
//  })
  res.render('seats',{bid:req.query.bid}); 
})
app.get("/pay",async(req,res)=>{
  res.render('payment'); 
})
app.get("/dest", (req, res) => {
  let data = [];
  console.log("formatttttttt ", req.query.date, moment(req.query.date).format("DD/MM/YYYY"))
  const finaldata = myJson.map((e) => {
    if ((e.startCity == req.query.fname) && (e.destination == req.query.lname) && (e.date===moment(req.query.date).format("DD/MM/YYYY"))) {
      data.push(e);
    }

  })

  res.send(data);

})

app.get("/verify-mail/:id", async (req, res) => {
  let email = req.session.email;
  console.log(email);
  const userdata = await passenger.findOne({email});

  console.log (userdata);
  const token2 = await userdata.generateAuthToken();
  res.cookie("jswt", token2);
  res.render('index');
})


app.get("/Login", (req, res) => {
  console.log(req.body);
  res.render('login');
})


app.get("/Signup", (req, res) => {
  res.render('signup');
})


app.post("/register/signUp", async (req, res) => {
  // console.log("signup clallws");
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password == cpassword) {
      const obj1 = new passenger({
        email: req.body.email,
        firstname: req.body.firstname,
        phone: req.body.phone,
        password: req.body.password,
        // are upr variable save h wo
        confirmpassword: cpassword,
        isverified: true,
        // whatsapp dek
      });

      req.session.email=req.body.email; 

      const result = await obj1.save();
      const token = await obj1.generateAuthToken();
      sendEmail(req.body.email, req.body.name, result._id);

     
      res.cookie("jswt", token);
      

      

      res.cookie("jswt",token);
      if (req.body.isverified == true){
        // res.render("index");

        res.render("index");
      } 
      else{
        // const token2 = await userdata.generateAuthToken();
        req.session.email=req.body.email; 
        res.send("please verify your email")
      }

    }
    else {
      res.render('password');
    }
  }
  catch (e) {
    res.send("something went wrong");
  }
})

app.post("/register/login/", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  try {
    const userdata = await passenger.findOne({ email });
    const isMatch = await bcrypt.compare(pass, userdata.password);
    // console.log('Password Match', isMatch);
    const token = await userdata.generateAuthToke
    res.cookie("jswt", token);
    if (!isMatch) {
      res.render('password');
    }
    else {
      if (userdata.isverified == true){
        req.session.email=email; 
        res.render("index");

      }

       
      else{
        res.send("please verify your email")
        res.render('error');
      }
       

    }
  }
  catch (e) {
    res.status(401).send(e);
  }
});

const sendEmail = async (email, name, id) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kukisinghal789@gmail.com",
        pass: "mdeehiysshlxzwhp"
      },
      tls: {
        rejectUnAuthorized: true
      }
    });

    const message = {
      from: process.env.MAIL,
      to: email,
      subject: "Heyy!!! passenger✔",
      text: "welcome to the busline ",
      html: `<b>hello ${name}</b> <h2>please verify your email<h2>
    <a href="http://127.0.0.1:3000/verify-mail/${id}">click here to verify your email</a>`, // html body
    }
    transporter.sendMail(message, (error, info) => {
      if (error)
        console.log("error" + " " + error);
      else
        console.log("email.sent  " + info.response)
    })

  }
  catch (e) {
    console.log("email not send some error occurs")
  }
}



app.listen(3000, () => {
  console.log("Started application on port %d", 3000)
});

