module.exports.signUpErrors = (err) => {
     let errors = {pseudo:'',email:'',password: ''}

     if(err.code === 11000 && err.keyPattern.pseudo === 1)
        errors.pseudo = 'Pseudo incorrect ou déjà pris';

     if(err.code === 11000 && err.keyPattern.email === 1)
         errors.email = 'Email incorrect ou déjà pris';

     if(err.errors){
         if(err.errors.email.path === 'email'){
            errors.email = 'Email incorrect';
         }
     }
         

     if(err.code === 11000 && err.keyPattern.password === 1)
        errors.password = 'Le mot de passe doit avoir au moins 6 caractères';
    
    
     return errors
};

module.exports.signInErrors = (err) => {
    let errors = {email:'',password: ''}

    if(err.code === 11000 && err.keyPattern.pseudo === 1)
       errors.pseudo = 'Pseudo incorrect ou déjà pris';

    if(err.code === 11000 && err.keyPattern.email === 1)
        errors.email = 'Email incorrect ou déjà pris';

    if(err.errors){
        if(err.errors.email.path === 'email'){
           errors.email = 'Email incorrect';
        }
    }
        

    if(err.code === 11000 && err.keyPattern.password === 1)
       errors.password = 'Le mot de passe doit avoir au moins 6 caractères';
   
   
    return errors
}