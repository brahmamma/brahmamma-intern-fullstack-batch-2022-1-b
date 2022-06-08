const { application } = require('express');
var express=require('express');
var router=express.Router();
var jwta=require('../jwt/jwt_admin');
var models =require('../models')
var bcrypt=require('bcrypt');


router.post('/addcategory',jwta,async (req,res)=>{
    const {category}=req.body
    try{
        const exist=await models.categories.findOne({where:{category}})
        if(!exist){
            let s=await models.categories.create({category:category})
            res.send(s)
            
        }
        else{
            
            res.send('category already exist')
        }
    }
    catch(err){
        res.send(err)
    }
    
});
router.post('/adddriver',jwta,async(req,res)=>{
    const {name,phonenumber,email,password,role_id}=req.body
    const hashed = bcrypt.hashSync(password, 6);
    var newdriver={name,phonenumber,email,password:hashed,role_id}
    try{
        let exist=await models.users.findOne({where:{email}})
        console.log(exist)
        if(!exist){
            let rel=await models.users.create(newdriver)
            res.status(200).json({message:'driver added'})
        }
        else{
            res.status(400).json({message:'driver already exist'})
             
        }

    }
    catch(err){
        res.send(err)
    }
    
})

router.post('/addproduct',jwta,async(req,res)=>{
    const {name,price,description,category_id,image,available_status}=req.body;
    var newproduct={name,price,description,category_id,image,available_status}
    try{
        
            let rel=await models.products.create(newproduct)
            res.status(200).json({message:'product added'})


    }
    catch(err){
        res.status(500).send(err)
    }



})
router.get('/allcategories',jwta,async (req,res)=>{
    try{
        const a=await models.categories.findAll()
        res.send(a)

    }
    catch(err){
        res.status(500).send(err)
    }
    

})
router.get('/allproducts',jwta,async (req,res)=>{
    try{
        const a=await models.products.findAll()
        res.send(a)

    }
    catch(err){
        res.status(500).send(err)

    }
    

})
router.get('/allusers',jwta,async (req,res)=>{
    try{
        const a=await models.users.findAll({where:{role_id:3}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.get('/alldrivers',jwta,async (req,res)=>{
    try{
        const a=await models.users.findAll({where:{role_id:2}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.put('/disableproduct/:id',jwta,async (req,res)=>{
    try{
        const a=await models.products.update({available_status:false},{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})  
router.put('/enableproduct/:id',jwta,async(req,res)=>{
    try{
        const a=await models.products.update({available_status:true},{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }

})
router.put('/updateproduct/:id',jwta,async (req,res)=>{
    try{
        const a=await models.products.update(req.body,{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.delete('/deleteproduct/:id',jwta,async (req,res)=>{  
    try{
        const a=await models.products.destroy({where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.get('/getproduct/:id',jwta,async (req,res)=>{
    try{
        const a=await models.products.findOne({where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.get('/getcategory/:id',jwta,async (req,res)=>{   
    try{
        const a=await models.categories.findOne({where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.get('/categoryproducts/:id',jwta,async(req,res)=>{
        try{{
                let a=await models.products.findAll({where:{category_id:req.params.id}})
                res.send(a)

        }}
        catch(err){
            res.status(500).send(err)
        }
})
module.exports=router