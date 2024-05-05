const mongoose = require("mongoose"); 
const validator=require("validator"); 
const bcrypt=require("bcrypt"); 
const jwt=require("jsonwebtoken"); 
const userSchema = new mongoose.Schema({
  
    email: {
        type: String,
        unique: true,
        required: true,
        validate(v){
            if(!(validator.isEmail(v))) 
            throw new Error("please enter a valid email")
        }
       },
       firstname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number, 
        minlength:[10, "phone no is too short"],
        unique:true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    } ,
    seatnumber:{
        type: Number, 
        unique:true,
        trim: true
    },
    isverified:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token: { type: String }
    }] 
})  

const seatSchema= new mongoose.Schema({
  
    email: {
        type: String,
        required: true,
      
       },
    seatNumber:{
        type: Number, 
        trim: true
    },
    busNumber:{
        type: Number, 
        trim: true
    }
   
})  



userSchema.methods.generateAuthToken=async function(){
try{
   const id=this._id; 
   const tokenval=jwt.sign({userid:id.toString()},"dbsdjfskdnsdnzFSDJ"); 
   this.tokens=this.tokens.concat({token:tokenval}); 
   await this.save(); 
   return this.tokens; 
} 
catch(e){
    res.send(e); 
}
}



userSchema.pre("save",async function(next){  
    if(this.isModified('password'|| this.isNew)){
        this.password=await bcrypt.hash(this.password,10);  
        this.confirmpassword=await bcrypt.hash(this.confirmpassword,10);
    }
 
next()
}); 
const passenger = new mongoose.model("passenger", userSchema,"passenger"); 

const seat = new mongoose.model("seat", seatSchema,"seat"); 

module.exports={passenger, seat}; 
