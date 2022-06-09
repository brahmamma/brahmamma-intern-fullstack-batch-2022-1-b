var express=require('express');
var router=express.Router();
var jwtu=require('../jwt/jwt_user')
var models=require('../models')


router.get('/allproducts',jwtu,async (req,res)=>{
    try{
        const a=await models.products.findAll({where:{available_status:true}})
        
        res.send(a)

    }
    catch(err){
        res.status(500).send(err)

    }
});
router.get('/allcategories',jwtu,async (req,res)=>{
    try{
        const a=await models.categories.findAll()
        res.send(a)

    }
    catch(err){
        res.status(500).send(err)

    }
});
router.get('/alladdresses',jwtu,async (req,res)=>{
    try{
        const a=await models.addresses.findAll({where:{user_id:req.user.id}})
        res.send(a)

    }
    catch(err){
        res.status(500).send(err)

    }
});
router.get('/allcartitems',jwtu,async (req,res)=>{
    try{
        const a=await models.allcarts.findOne({where:{user_id:req.user.id}})
        const cart_pros=await models.usercarts.findAll({where:{cart_id:a.id}})
        const allpros=await models.products.findAll()
        const c=[];
        cart_pros.map((ci)=>{
            allpros.map((ap)=>{
                if(ci.product_id==ap.id){
                    c.push({id:ci.id,product:ap,quantity:ci.quantity,cart_id:ci.cart_id})
                }
            })
        })

        res.send(c)

    }
    catch(err){
        res.status(500).send(err)

    }
});

router.post('/addaddress',jwtu,async(req,res)=>{
   
    const {hno,village,mandal,district,state,pincode}=req.body;
    const na={
        user_id:parseInt(req.user.id),
        hno:hno,
        village:village,
        mandal:mandal,
        district:district,
        state:state,
        pincode:pincode
    }
    
    try{
        
        const rel=await models.addresses.create(na);
        res.send(rel)


    }
    catch(err){
        res.status(500).send(err)
    }
})
/*router.get('/addtocart/:id',jwtu,async (req,res)=>{
    
    try{    
            const cart_id=await models.allcarts.findOne({where:{user_id:req.user.id}});
           
            const newproduct={cart_id:parseInt(cart_id.id),produt_id:parseInt(req.params.id)}
            await models.usercarts.create(newproduct)
            const b=await models.carts.create({user_id:req.user.id,product_id:product_id})
            res.send(a)
            




    }
    catch(err){
        res.status(500).send(err)

    }
})*/
router.get('/addtocart/:id',jwtu,async (req,res)=>{
    try{
        const a=await models.products.findOne({where:{id:parseInt(req.params.id)}})
        const b=await models.allcarts.findOne({where:{user_id:parseInt(req.user.id)}})
        const c=await models.usercarts.findOne({where:{cart_id:parseInt(b.id),product_id:parseInt(a.id)}})
        if(c){
            c.quantity+=1
            c.save()
            res.send(c)
        }
        else{
            await models.usercarts.create({cart_id:parseInt(b.id),product_id:parseInt(a.id),quantity:1})
            res.send(c)
        }
    }
    catch(err){
        res.status(500).send(err)

    }
});
router.delete('/removefromcart/:id',jwtu,async (req,res)=>{
    try{
        const c=await models.usercarts.destroy({where:{id:parseInt(req.params.id)}})
        res.send(c)
    }
    catch(err){
        res.status(500).send(err)

    }
});
router.get('/incquan/:id',jwtu,async (req,res)=>{
    try{
        const c=await models.usercarts.findOne({where:{id:parseInt(req.params.id)}})
        c.quantity+=1
        c.save()
        res.send(c)
    }
    catch(err){
        res.status(500).send(err)

    }
})
router.get('/decquan/:id',jwtu,async (req,res)=>{
    try{
        const c=await models.usercarts.findOne({where:{id:parseInt(req.params.id)}})
        if(c.quantity===0 || c.quantity<=0){
           c.quantity=1
           c.save()
           res.send(c)
        }
        else{
            c.quantity-=1
            c.save()
            res.send(c)

        }
    }
    catch(err){
        res.status(500).send(err)

    }
})
router.post('/placeorder',jwtu,async(req,res)=>{
    
   const no={
       user_id:parseInt(req.user.id),
       product_id:parseInt(req.body.pro.id),
       address_id:parseInt(req.body.add.id),
       quantity:parseInt(req.body.pro.quantity),
       delivered_status:false,
       ordered_at:new Date(),
       
   }     
    
    
    try{
        const rel=await models.orders.create(no);
        res.send(rel)


    }
    catch(err){
        res.status(500).send(err)
    }
})
router.get('/allorders',jwtu,async (req,res)=>{
    try{
        const o=await models.orders.findAll({where:{user_id:parseInt(req.user.id)}})
        const p=await models.products.findAll()
        const a=await models.addresses.findAll()
        const allods=[]
        o.map((order)=>{
            p.map((po)=>{
                a.map((ad)=>{
                    if(order.product_id===po.id&&order.address_id===ad.id){
                        let date=new Date(order.ordered_at)
                        date.setDate(date.getDate()+7)
                        allods.push({id:order.id,product:po,address:ad,quantity:order.quantity,ordered_at:order.ordered_at.getDate()+"/"+order.ordered_at.getMonth()+"/"+order.ordered_at.getFullYear(),delivered_status:order.delivered_status,delivery_date:date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()})
                    }
                })
            })

            
            

        })
        console.log(allods)
        res.send(allods)

    }
    catch(err){
        res.status(500).send(err)

    }
}) 
router.delete('/deleteorder/:id',jwtu,async (req,res)=>{
    try{
        const c=await models.orders.destroy({where:{id:parseInt(req.params.id)}})
        res.send(c)
    }
    catch(err){
        res.status(500).send(err)

    }
})
module.exports=router