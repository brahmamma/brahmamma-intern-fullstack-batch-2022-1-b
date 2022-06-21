var express=require('express')
var bodyparser=require('body-parser');
var cors=require('cors');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var app=express()
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())
var adminroutes=require('./routes/admin.routes')
var userroutes=require('./routes/user.routes')
var driverroutes=require('./routes/driver.routes')
var models=require('./models')
var jwta=require('./jwt/jwt_admin')
var jwtu=require('./jwt/jwt_user')
var jwtd=require('./jwt/jwt_driver')
require('dotenv').config()
const client = require('twilio')(process.env.accountSID,process.env.authToken);

var port=process.env.PORT||8000;

app.post('/userregister',async(req,res)=>{
    const {name,email,phonenumber,password,role_id}=req.body

    
    const hashed = bcrypt.hashSync(password, 6);
    var newuser={name,email,phonenumber,password:hashed,role_id}
    
    
    try{
        let exist=await models.users.findOne({where:{email:email}})
        if(!exist){
            let rel=await models.users.create(newuser)
            await models.allcarts.create({user_id:rel.id})
            res.status(200).json({message:'user created'}) 
        }
        else{
            res.status(400).json({message:'user already exist'})
        }

    }
    catch(err){
        res.status(500).send(err)
    }

})


app.post('/loginauthentication',async(req,res)=>{
    const {email,password}=req.body
    
    
    try{
        const rel=await models.users.findOne({where:{email:email}})
        if(rel){
            const validPassword = bcrypt.compareSync(password, rel.password);
            if(validPassword){
                const payload={email}
               
                const token=jwt.sign(payload,'secretkey')
                const result={token:token,user:rel}
                 res.status(200).send(result)
            }
            else{
                res.status(405).send('password is incorrect')
            }
            
        }
        else{
            res.status(410).send("User not found")
        }

    }
    catch(err){
        res.send(500).send('internal server error')
    }

})

app.get('/allusers',async(req,res)=>{
    
    try{
        let data=await models.users.findAll()
        res.send(data)
    }
    catch(err){
        res.status(500).send("Server error")
    }
})
app.post('/findemail',async(req,res)=>{
    try{
        
        let user= await models.users.findOne({where:{email:req.body.email}})
        if(user){
           res.status(200).send(user)
        }
        else{
            res.status(410).send("Email Doesn't exit")
        }

    }
    catch(err){
        res.status(500).send(err)

    }
})
app.post('/updatepassword',async(req,res)=>{
    try{
        const password=bcrypt.hashSync(req.body.pass.password,6)
        let user= await models.users.update({password:password},{where:{id:req.body.id}})
        if(user){
           res.status(200).send('success')
        }
        else{
            res.status(410).send("Not Updated")
        }

    }
    catch(err){
        res.status(500).send(err)

    }
})
app.post('/finduser',async(req,res)=>{
    try{
        
        let user= await models.users.findOne({where:{email:req.body.email}})
        if(user){
           
            client.verify
            .services(process.env.serviceSID)
            .verifications
            .create({
                to: "+91" + user.dataValues.phonenumber,
                channel: 'sms',
            }).then(data => {res.status(200).send(user)
               
            })
        }
        else{
            res.status(410).send("Email Doesn't exit")
        }

    }
    catch(err){
        res.status(500).send(err)

    }
})
app.post('/verifyuser',async(req,res)=>{
    const {user,otp}=req.body
    try{
        if(otp){
            client.verify
            .services(process.env.serviceSID)
            .verificationChecks
            .create({
                to: "+91" + user.phonenumber,
                code: otp,
            }).then(data => {if(data.valid){
                
                

                const payload={email:user.email}
               
                const token=jwt.sign(payload,'secretkey')
                const result={token:token,user:user}
                 res.status(200).send(result)
            }})


        }
        else{
            res.status(410).send('Incorrect OTP')
        }


    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }


})

app.use('/user',userroutes)
app.use('/admin',adminroutes)
app.use('/driver',driverroutes)





app.listen(port,()=>{console.log(`server is running on ${port}`)})