const Restaurant = require('../models/Restaurant');
const ObjectID =  require('mongoose').Types.ObjectId;


module.exports.getRestaurants = async (req,res)=>{
  
        try {
            const restau = await Restaurant.find().sort({_id:-1});
            res.status(201).json(restau);
        } catch (error) {
            res.status(500).json(error)
        }
   
}


//Compter les restaurants
module.exports.countRestau =  async (req,res) => {
    try {
        const restauCount = await Restaurant.aggregate([
            {$group:{_id:null,total:{$sum:1}}},
            {$project:{_id:0}}
        ]);
        res.status(200).json(restauCount); 
     } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getRestaurant = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('Identifiant inconnu : '+req.params.id);

    try {
        const restau = await Restaurant.findById(req.params.id)
        const {...others} = restau._doc;
        res.status(201).json(others);
       } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.create = async (req,res)=>{
    let fileName;
    if(!req.file !== undefined){
        try {
            if(req.file.mimetype !== "image/jpg" &&
               req.file.mimetype !== "image/png" &&
               req.file.mimetype !== "image/jpeg"
            ){
                res.status(400).json({message:"Fichier invalide"});
            }
        } catch (error) {
            res.status(201).json(error);
        }

        fileName = req.file.filename;
    }
    const newRestau = new Restaurant({
            name:req.body.name,
            address:req.body.address,
            telephone:req.body.telephone,
            web:req.body.web,
            image:req.file !== undefined ? fileName : "",
            tables:[]
    });

    try {
        const saveRestau = await newRestau.save();
        res.status(201).json(saveRestau);
       } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.update = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('ID inconnu : ' + req.params.id);

    try {
        const updatedRestau = await Restaurant.findByIdAndUpdate(req.params.id,{
                 $set:req.body,
             },{new:true}
          );
       res.status(200).json(updatedRestau);

     } catch (error) {
         res.status(500).json(error)
     }
}
 

module.exports.delete = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);
    try {
        await Restaurant.findByIdAndDelete(req.params.id)
        res.status(200).json("Restaurant supprimé avec succès");
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.addTable = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('ID inconnu : ' + req.params.id);

    try {
         const reqTable = await Restaurant.findById(req.params.id)
         const theTable = reqTable.tables.find((table)=> table.name == req.body.name)
         if(theTable) return res.status(404).json("Cette table existe déjà");
         const addTable = await Restaurant.findByIdAndUpdate(
            req.params.id,
            {
                $push:{
                    tables:{
                        name:req.body.name,
                        capacity:req.body.capacity,
                        isAvailable:req.body.isAvailable,
                        location:req.body.location 
                    }
                }
            },
            {new:true}
        );

      res.status(200).json(addTable);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.editTable = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id);

    try {

        const docs = await Restaurant.findById(req.params.id);
        const theTable =   docs.tables.find((table) => table._id.equals(req.body.tableId))
        if(!theTable) return res.status(404).json("Table non trouvée");
        theTable.name = req.body.name
        theTable.capacity = req.body.capacity
        theTable.isAvailable = req.body.isAvailable
        theTable.location = req.body.location

        return docs.save((err) => {
            if(!err) return res.status(200).json(docs);
            return res.status(500).json(err);
        });



    } catch (error) {
       return res.status(500).json(error)
    }

}


module.exports.deleteTable = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('ID inconnu : ' + req.params.id);

    try {

        const deletedTable = await Restaurant.findByIdAndUpdate(
            req.params.id,
                {
                    $pull:{
                        tables:{
                            _id:req.body.tableId
                        }
                    }
                },
                {new:true}
            );
            res.status(200).json(deletedTable);

    } catch (error) {
        res.status(500).json(error)
    }

}