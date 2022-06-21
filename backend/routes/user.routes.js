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
router.put('/updateprofile/:id',jwtu,async (req,res)=>{
    try{
        
        const a=await models.users.update(req.body,{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.post('/addaddress',jwtu,async(req,res)=>{
   
    const {address,lanlat}=req.body;
    const na={
        user_id:parseInt(req.user.id),
        address:address,
        lanlat:lanlat
    }
    try{
        
        const rel=await models.addresses.create(na);
        res.send(rel)


    }
    catch(err){
        res.status(500).send(err)
    }
})

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
router.delete('/deleteaddress/:id',jwtu,async (req,res)=>{
    try{
        const c=await models.addresses.destroy({where:{id:parseInt(req.params.id)}})
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

router.post('/placeoneorder',jwtu,async(req,res)=>{
    const no={
       user_id:parseInt(req.user.id),
       address_id:parseInt(req.body.add.id),
       delivered_status:false,
       order_status:1,
       order_amount:(req.body.pro.price*parseInt(req.body.pro.quantity)),
       ordered_at:new Date(),
       
   }     
    
    
    try{
        const rel=await models.allorders.create(no);
        const ap={
            order_id:rel.id,
            product_id:req.body.pro.id,
            price:req.body.pro.price,
            quantity:req.body.pro.quantity

        }
        const fr=await models.orderedproducts.create(ap);
        res.send(rel)


    }
    catch(err){
        res.status(500).send(err)
    }
})
router.post('/placeallorders',jwtu,async(req,res)=>{
    var ta=0
    var ci=null
    req.body.products.map((pro)=>{
       ta=ta+((pro.product.price)*(pro.quantity))
       ci=pro.cart_id;

    })
    
    
    
    
    const no={
       user_id:parseInt(req.user.id),
       address_id:parseInt(req.body.add.id),
       delivered_status:false,
       order_status:1,
       order_amount:ta,
       ordered_at:new Date(),
       
   }     
    
    
    try{
        const rel=await models.allorders.create(no);
        const bo=[];
        req.body.products.map((pro)=>{
            const ap={
                order_id:rel.id,
                product_id:pro.product.id,
                price:pro.product.price,
                quantity:pro.quantity
            }
            bo.push(ap)
            
     
         })
        const fr=await models.orderedproducts.bulkCreate(bo);
        const de=await models.usercarts.destroy({where:{cart_id:ci}})
        res.send(rel)


    }
    catch(err){
        res.status(500).send(err)
    }
})
router.get('/allorders',jwtu,async (req,res)=>{
    

    try{
        
        const orderarray=await models.allorders.findAll({where:{user_id:parseInt(req.user.id)}})
        const u=await models.users.findOne({where:{id:parseInt(req.user.id)}})
        const drivers=await models.users.findAll({where:{role_id:2}})
        const p=await models.products.findAll()
        const a=await models.addresses.findAll({where:{user_id:parseInt(req.user.id)}})
        const s=await models.orderstatuses.findAll()
        const productsarray=await models.orderedproducts.findAll();

        const allorders=[]
        orderarray.map((oa)=>{
            const order={}
            order.id=oa.id,
            order.user_id=oa.user_id,
            order.phonenumber=u.phonenumber,
            order.amount=oa.order_amount,
            
            drivers.map((driver)=>{
                if(oa.driver_id===driver.id){
                    
                    order.driver_id=driver.id,
                    order.drivername=driver.name
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
            order.ordered_at=oa.ordered_at.getDate()+"/"+parseInt(oa.ordered_at.getMonth()+1)+"/"+oa.ordered_at.getFullYear(),
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

router.delete('/deleteorder/:id',jwtu,async (req,res)=>{
    try{
        const d=await models.orderedproducts.destroy({where:{order_id:parseInt(req.params.id)}})
        const c=await models.allorders.destroy({where:{id:parseInt(req.params.id)}})
        res.send(c)
    }
    catch(err){
        res.status(500).send(err)

    }
})




module.exports=router