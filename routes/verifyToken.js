const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(error,user)=>{
            if(error) res.status(403).json("Token invalide!")
            req.user = user;
            next();
           
        })
    }else{ 
        res.status(401).json("Vous n'êtes pas authentifié!")
    }
};


const verifyAuth = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(error,user)=> {
            if(error){
                console.log(error);
            }else{
                console.log(user.id);
                req.user = user;
                next();
            } //res.status(403).json("Token invalide!")
           
           
        })
    }else{ 
        res.status(401).json("No token!")
    }
};


const verifyTokenAndAuthorisation = (req,res,next) => {
    verifyToken(req,res,()=>{
       if(req.user.id === req.params.id || req.user.isAdmin){
         next();
       }else{
            res.status(403).json("Vous n'êtes pas autorisé à utilser cette opération");
       }
    })
};


const verifyTokenAndAuthorisationSellerAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
       if(req.user.id === req.params.id || req.user.isAdmin || req.user.isSeller ){
         next();
       }else{
            res.status(403).json("Vous n'êtes pas autorisé à utilser cette opération");
       }
    })
};

const verifyTokenAndSeller = (req,res,next) => {
    verifyToken(req,res,()=>{
       if(req.user.isSeller ){
         next();
       }else{
            res.status(403).json("Vous n'êtes pas autorisé à utilser cette opération");
       }
    })
};




const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
       if( req.user.isAdmin){
         next();
       }else{
            res.status(403).json("Vous n'êtes pas autorisé à utilser cette opération");
       }
    })
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorisation,
    verifyTokenAndAdmin,
    verifyAuth,
    verifyTokenAndAuthorisationSellerAndAdmin,
    verifyTokenAndSeller
}