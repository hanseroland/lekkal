const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema(
    {
        date:{type:String,required:true},
        restaurantId:{type:String,required:true},
        tableId:{type:String,required:true},
        time:{type:String,required:true},
        name:{type:String,required:true},
        phone:{type:String,required:true},
        email:{type:String,required:true}
    },
    {timestamps:true}
);
module.exports = mongoose.model('Reservation', ReservationSchema);