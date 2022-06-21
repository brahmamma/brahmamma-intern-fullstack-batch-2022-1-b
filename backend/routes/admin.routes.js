
var express=require('express');
var router=express.Router();
var jwta=require('../jwt/jwt_admin');
var models =require('../models')
var bcrypt=require('bcrypt');
var multer=require('multer');
var shortid=require('shortid');
var path=require('path');
var app=express();



router.post('/addproduct',jwta,async(req,res)=>{
    
    
    const {name,price,description,category_id,available_status,image,delete_status}=req.body;
   
    
    
    var newproduct={name,price,description,category_id,image,available_status,delete_status}
    try{
        
            let rel=await models.products.create(newproduct)
            res.status(200).json({message:'product added'})


    }
    catch(err){
        res.status(500).send(err)
    }
})

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
        const a=await models.products.findAll({where:{delete_status:false}})
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
router.put('/updateprofile/:id',jwta,async (req,res)=>{
    try{
        
        const a=await models.users.update(req.body,{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.put('/acceptorder/:id',jwta,async (req,res)=>{
    try{
        const a=await models.allorders.update({order_status:2},{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.put('/rejectorder/:id',jwta,async (req,res)=>{
    try{
        const a=await models.allorders.update({order_status:5},{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.delete('/deleteproduct/:id',jwta,async (req,res)=>{  
    try{
        const a=await models.products.update({delete_status:true,available_status:false},{where:{id:req.params.id}})
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
router.get('/allorders',jwta,async (req,res)=>{
    

    try{
        
        const orderarray=await models.allorders.findAll({})
        const u=await models.users.findAll()
        const p=await models.products.findAll()
        const a=await models.addresses.findAll()
        const s=await models.orderstatuses.findAll()
        const productsarray=await models.orderedproducts.findAll();

        const allorders=[]
        orderarray.map((oa)=>{
            const order={}
            order.id=oa.id,
            u.map((user)=>{
                if(oa.user_id===user.id){
                    order.user_id=user.id;
                    order.customer=user.name
                    order.phonenumber=user.phonenumber
                }
            })
            order.amount=oa.order_amount,
            
            u.map((user)=>{
                if(oa.driver_id===user.id){
                    
                    order.driver_id=user.id,
                    order.drivername=user.name
                }
            })
            order.delivered_status=oa.delivered_status,
            s.map((st)=>{
                if(st.id===oa.order_status){
                    order.order_status=st.status
                }
            })
            a.map((ad)=>{
                if(ad.id===oa.address_id){
                    order.address=ad
                }
            })
            let date=new Date(oa.ordered_at)
            date.setDate(date.getDate()+7)
            order.ordered_at=oa.ordered_at.getDate()+"/"+oa.ordered_at.getMonth()+1+"/"+oa.ordered_at.getFullYear(),
            order.delivery_date=date.getDate()+"/"+parseInt(date.getMonth()+1)+"/"+date.getFullYear();
            const allproducts=[]
            productsarray.map((pa)=>{
                if(oa.id===pa.order_id){
                    p.map((ep)=>{
                        if(pa.product_id===ep.id){
                            const pro={
                                product_id:pa.product_id,
                                name:ep.name,
                                price:pa.price,
                                quantity:pa.quantity
                            }
                            allproducts.push(pro)
                        }
                    })
                }

            })
            order.products=allproducts

            allorders.push(order)
            

        })
            res.send(allorders)
            
        }
    catch(err){
        res.status(500).send(err)

    }
})
module.exports=router