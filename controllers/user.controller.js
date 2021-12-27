const User = require('../models/User');
const ObjectID =  require('mongoose').Types.ObjectId;
const CryptoJs = require('crypto-js') //Pour crypter le mot de passe




//Obtenir tous les utilisateurs
module.exports.getAllUsers =  async (req,res) => {
    const query = req.query.new; 
    try {
        const users = query 
        ? await User.find().select('-password').sort({_id:-1}).limit(5)
        : await User.find().select('-password');
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json(error)
    }
   
   
}



//Obtenir un utilisateur
module.exports.getUserInfo = async (req,res) => {

 if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc;
        res.status(200).json(others);
      } catch (error) {
         res.status(500).json(error)
    }
   
   
}

//mettre à jour un utilisateur
module.exports.updateUserInfo = async (req,res) => {
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('ID inconnu : ' + req.params.id);
   if(req.body.password){
            req.body.password= CryptoJs.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
        ).toString()    //On crypte le mot de passe
    }
            
    try {
           const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true}
             );
          res.status(200).json(updatedUser);

        } catch (error) {
            res.status(500).json(error)
        }
      
      
   }

//Supprimer  un utilisateur
module.exports.deleteUser = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send('ID inconnu : ' + req.params.id);
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Utilisateur supprimé avec succès");
    } catch (error) {
        res.status(500).json(error) 
    }
};


//Compter les   utilisateurs
module.exports.countUser =  async (req,res) => {
   
    try {
        const userCount = await User.aggregate([
            {$group:{_id:null,total:{$sum:1}}},
            {$project:{_id:0}}
        ]);
       
        res.status(200).json(userCount);
        
    } catch (error) {
        res.status(500).json(error)
    }
   
   
}

//Obtenir le total d'utilisateur par mois
module.exports.getUsersStats = async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
 
    try {
        const data = await User.aggregate([
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
       res.status(500).json(error);
    }
 };
