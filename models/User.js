const mongoose = require('mongoose');
const {isEmail} = require('validator')

const UserSchema = mongoose.Schema(
    {
        pseudo:{type:String,required:true,unique:true},
        email: {type:String,required:true,unique:true,validate:[isEmail]},
        password: {type:String,required:true,max:1024,minlength:6},
        isAdmin:{
            type:Boolean,
            default:false
        },

    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);