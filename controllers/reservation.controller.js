const Reservation = require('../models/Reservation');
const ObjectID =  require('mongoose').Types.ObjectId;


//get all 
module.exports.getAllReservation = async (req,res)=>{
   
    try {
            const reservations = await Reservation.find().sort({_id:-1});
            res.status(201).json(reservations);
        } catch (error) {
            res.status(500).json(error) 
        }
  
}

//obtenir un jour
module.exports.getReservation = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('Identifiant inconnu : '+req.params.id);

    try {
        const reservation = await Reservation.findById(req.params.id)
        const {...others} = reservation._doc;
        res.status(201).json(others);
       } catch (error) {
        res.status(500).json(error)
    }
}

//Compter les  reservation
module.exports.countReservation =  async (req,res) => {
    try {
        const resCount = await Reservation.aggregate([
            {$group:{_id:null,total:{$sum:1}}},
            {$project:{_id:0}}
        ]);
       
        res.status(200).json(resCount);
        
    } catch (error) {
        res.status(500).json(error)
    }
   
   
}

//Stats
module.exports.statistiques =  async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    
    try {
        const data = await Reservation.aggregate([
            {$match: {createdAt:{$gte: lastYear}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",
                    total: {$sum:1}
                }
            }
        ]);
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json(error)
    }
   
   
}


//ajouter une reservation
module.exports.create = async (req,res) => {

    const newReservation = new Reservation({
        date:req.body.date,
        restaurantId:req.body.restaurantId, 
        tableId:req.body.tableId,
        time:req.body.time,
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
        

    });
    try {
            
            const saveReservation = await newReservation.save();
            res.status(201).json(saveReservation);
      
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.update = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('ID inconnu : ' + req.params.id);

    try {
        const updatedReserve = await Reservation.findByIdAndUpdate(req.params.id,{
                 $set:req.body,
             },{new:true}
          );
       res.status(200).json(updatedReserve);

     } catch (error) {
         res.status(500).json(error)
     }
}
 
module.exports.delete = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);
    try {
        await Reservation.findByIdAndDelete(req.params.id)
        res.status(200).json("Reservation supprimée avec succès");
    } catch (error) {
        res.status(500).json(error)
    }
}
