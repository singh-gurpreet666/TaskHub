const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,'name length should be minimum of 3'],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Your email is not correct")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[5,"Password lenght should be minimun of 5"]
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const user = mongoose.model("user",UserSchema);
module.exports = user;