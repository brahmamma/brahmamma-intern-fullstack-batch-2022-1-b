var {sequelize,users}=require('./models')
var bcrypt=require('bcrypt')
sequelize.authenticate();
console.log("database connected");

(async()=>{
   
    const hashed = bcrypt.hashSync('brahmiC735@',6);
    var newadmin={name:"brahmi",password:hashed,email:"brahmi123@gmail.com",role_id:1,phonenumber:9876543210}
   try{
       const exist=await users.findOne({where:{email:newadmin.email}})
       if(exist){
           console.log("you are already an admin")
       }
       else{
        users.create(newadmin)
        console.log("Admin is added")

       }
    
   }
   catch(err){
       console.log(err)
   }

}

)()