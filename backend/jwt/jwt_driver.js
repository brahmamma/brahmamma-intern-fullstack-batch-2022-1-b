var jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{

    
    const token=req.headers.token;
    const user=JSON.parse(req.headers.users);
    if(!token || !user){
        
        res.send({msg:'Token is missing'})
        
    }
    if(!token || token === '' || !user || user === ''){
        
        res.send({msg:'Token is not valid'})
       
    }
    let decodedToken;
    
    
    try{
        decodedToken=jwt.verify(token,'secretkey');
     
        if(user.role_id===2){
            req.token=decodedToken
            next();
        } 
        else{
            
            res.send({msg:'You are not authorized to access this page'})
        } 
    }
    catch(err){
        res.send({msg:'Token is not valid'})
        
    }
    
    
}


