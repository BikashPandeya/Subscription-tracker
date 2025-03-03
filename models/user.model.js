import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , "Username is required"],
        trim : true ,
        minLength : 2 ,
        maxLength : 50,
    }
})