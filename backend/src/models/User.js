import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userScheme = new mongoose.Schema({
    name :{
        type : String,
        required : [true, "Please provide a name"]
    },
    email : {
        type : String,
        required : [true, "Please provide a email"],
        unique : true,
        match : [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ]
    },
    password : {
        type : String,
        required : [true , "Please providse a password"],
        minlength : 6,
        select : false
    }
}, {timestamps : true});

userScheme.pre("save", async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});
userScheme.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userScheme);
export default User;