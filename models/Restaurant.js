const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema(
    {
        name:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        telephone:{type:Number,required:true},
        web:{type:String,default:""},
        image:{type:String,default:"restaurant.png"},
        tables:{
            required:true,
            type:[
                {
                    name:String,
                    capacity:String,
                    isAvailable:String,
                    location:String,
               }
             ] 
        }
    }, 
    {timestamps:true}
);

module.exports = mongoose.model('Restaurant', RestaurantSchema); 