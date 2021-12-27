const User = require('../models/User');
const CryptoJs = require('crypto-js') //Pour crypter le mot de passe
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/errors.utils');

const maxTime = 3*24*60*60*1000

module.exports.signUp = async (req,res) => {
    const newUser = new User({
        pseudo:req.body.pseudo,
        email:req.body.email,
        isAdmin:req.body.isAdmin,
        password: CryptoJs.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
        ).toString()    //On crypte le mot de passe
    });
    try {
        const saveUser =  await newUser.save();//on enrégistre dans la base de données
        res.status(201).json(saveUser);
    } catch (error) {
         const errors = signUpErrors(error);
        res.status(500).json({errors}) 
       
    }
}


//login, connexion
module.exports.signIn =  async (req,res) => { 
    try {
        const user = await User.findOne({email:req.body.email});//on recherche l'utilisateur par email (unique)
        !user && res.status(401).json("Erreur d'utilisateur, email incorrect")//Si l'email n'est pas retrouvé


        const hashedPassword = CryptoJs.AES.decrypt( 
            user.password,
            process.env.PASS_SEC
        );//On crypte le mot de passe
        const OriginPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

        OriginPassword !== req.body.password && 
        res.status(401).json("Erreur de mot de passe"); //si le mot de passe ne correspond pas

        const accessToken = jwt.sign(
            {
                id:user._id,
                isAdmin: user.isAdmin,
            },
           process.env.JWT_SEC,
           {expiresIn:"3d"}
        );

        
        const {password,...others} = user._doc;

        res.cookie('jwt', accessToken,{httpOnly:true,maxTime})
        res.status(200).json({...others,accessToken});
        
         
    } catch (error) {
        res.status(500).json(error);
    }
};


//logout, déconnexion
module.exports.logout =  (req,res) => {
   req.headers.token = null;
   res.redirect('/');
    
};