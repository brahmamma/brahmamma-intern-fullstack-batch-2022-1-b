
var express=require('express');
var router=express.Router();
var jwtd=require('../jwt/jwt_driver')
var models =require('../models')
const getDistancesFromOrigin = require('./distancematrix.js');
router.get('/allorders',jwtd,async (req,res)=>{
   
    try{
        const orderarray=await models.allorders.findAll({where:{order_status:2}})
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
            order.driver_id=oa.driver_id,
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
            order.ordered_at=oa.ordered_at.getDate()+"/"+oa.ordered_at.getMonth()+"/"+oa.ordered_at.getFullYear(),
            order.delivery_date=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
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
            console.log(order)

        })
            res.send(allorders)
            console.log(allorders);
            
        }
    catch(err){
        res.status(500).send(err)

    }
})
router.get('/selectedorders',jwtd,async (req,res)=>{
   
    try{
        const orderarray=await models.allorders.findAll({where:{driver_id:req.user.id,delivered_status:false}})
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
            order.driver_id=oa.driver_id,
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
            order.ordered_at=oa.ordered_at.getDate()+"/"+oa.ordered_at.getMonth()+"/"+oa.ordered_at.getFullYear(),
            order.delivery_date=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
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
            console.log(allorders);
            
        }
    catch(err){
        res.status(500).send(err)

    }
})
router.put('/updateprofile/:id',jwtd,async (req,res)=>{
    try{
        
        const a=await models.users.update(req.body,{where:{id:req.params.id}})
        res.send(a)
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.put('/selection/:id',jwtd,async(req,res)=>{
    try{
        const rel=await models.allorders.update({driver_id:req.user.id,order_status:3},{where:{id:req.params.id}})
        const ns={
            driver_id:req.user.id,
            order_id:req.params.id,
            delivered_status:false,
        }
        const r=await models.driverorders.create(ns);
        res.send(r)

    }
    catch(err){
       console.log(err)
    }
})
router.put('/deselection/:id',jwtd,async(req,res)=>{
    try{
        
        const rel=await models.allorders.update({driver_id:null,order_status:2},{where:{id:req.params.id}})
        
        const r=await models.driverorders.destroy({where:{order_id:req.params.id}})
        
        
        res.send(r)

    }
    catch(err){
       console.log(err)
    }
})

router.get('/setroute',jwtd,async(req,res)=>{
    const id=req.user.id
    const ar= await models.allroutes.create({driver_id:parseInt(req.user.id),visited_status:false})
    await models.sequelize.query(`SELECT *  from allorders,driverorders,addresses where driverorders.order_id=allorders.id AND driverorders.driver_id=${id} AND driverorders.delivered_status=false AND allorders.address_id=addresses.id`)
    .then((data)=>{

        if (data[0].length > 0) {
            const routes = [];
            const latLangs = data[0].map((item) => item.lanlat);
            const addresses = data[0].map((item) => item.address);
            const origins=['Tallapalli, Andhra Pradesh, India']
            var destinations = latLangs.map(
                (item) =>
                    JSON.parse(item).lat +
                    ',' +
                    JSON.parse(item).lng
            );
            getDistancesFromOrigin(origins, destinations)
                .then((distances) => {
                    for (let i = 0; i < data[0].length; i++) {
                        if (i === 0) {
                            routes.push({
                                route_id:ar.id,
                                order_id: data[0][i].order_id,
                                address: data[0][i].address,
                                distance: distances[i].distance,
                                flag: false,
                            });
                        } else {
                            routes.push({
                                route_id:ar.id,
                                order_id: data[0][i].order_id,
                                address: data[0][i].address,
                                distance: distances[i].distance,
                                flag: true,
                            });
                        }
                    }
                    routes.sort((a,b)=>{
                        return parseInt(a.distance)-parseInt(b.distance)
                      }
                    )
                    
                    const ir=models.routes.bulkCreate(routes)
                    res.status(200).send("Created")
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('no data');
            res.status(200).json({
                success: false,
                message: 'No orders found',
            });
        }
    })
    
    })
router.get('/getroutes',jwtd,async (req,res)=>{
   
    try{
        const orderarray=await models.allorders.findAll({where:{driver_id:parseInt(req.user.id),delivered_status:false}})
        const u=await models.users.findAll()
        const productsarray=await models.orderedproducts.findAll();
        const rel=await models.allroutes.findAll({where:{visited_status:false,driver_id:req.user.id}})
        const rts=await models.routes.findAll({where:{route_id:rel[0].id}})
        const p=await models.products.findAll()
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
            rts.map((rt,i)=>{
                if(rt.order_id===oa.id){
                    const root={
                        distance:rt.distance,
                        flag:rt.flag,
                        address:rt.address,
                        route_id:rt.route_id,

                    }
                    order.route=root
                }
            })
            order.amount=oa.order_amount,
            order.driver_id=oa.driver_id,
            order.delivered_status=oa.delivered_status;
            let date=new Date(oa.ordered_at)
            date.setDate(date.getDate()+7)
            order.ordered_at=oa.ordered_at.getDate()+"/"+parseInt(oa.ordered_at.getMonth()+1)+"/"+oa.ordered_at.getFullYear();
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

            var values=allorders.sort((a,b)=>{
                return parseInt(a.route.distance)-parseInt(b.route.distance)
            })
            for(var i=0;i<values.length;i++){
                if(i==0){
                    const r=await models.routes.findOne({where:{order_id:values[i].id}})
                    r.flag=true
                    r.save()
                    values[i].route.flag=true
                }
                else{
                    values[i].route.flag=false
                }
            }
            res.send(values)
            
            
        }
    catch(err){
        
        res.status(500).send(err)

    }
})
/*router.get('/getroutes',jwtd,async (req,res)=>{
    await models.sequelize.query(`SELECT * from allorders,allroutes,routes,orderedproducts,products where orderedproducts.order_id=allorders.id AND orderedproducts.product_id=products.id AND routes.route_id=allroutes.id AND allroutes.visited_status=false AND delivered_status=false AND allorders.driver_id=${req.user.id}`)
    .then((data)=>{
        console.log("=====================",data[0])
    })
})*/
router.post('/orderdeliver',jwtd,async (req,res)=>{
    const {pres,next,i,l}=req.body;
    try{
        
        if(i===l){
            
            const order=await models.allorders.findOne({where:{id:pres.id}})
            const drord=await models.driverorders.findOne({where:{order_id:pres.id}})
            const pr=await models.routes.findOne({where:{order_id:pres.id}})
            const ar=await models.allroutes.findOne({where:{id:pr.route_id}})
            
            order.delivered_status=true
            order.order_status=4
            drord.delivered_status=true
            ar.visited_status=true
            pr.flag=false

            drord.save()
            order.save()
            pr.save()
            ar.save()
        }
        else{
            const order=await models.allorders.findOne({where:{id:pres.id}})
            const drord=await models.driverorders.findOne({where:{order_id:pres.id}})
            const pr=await models.routes.findOne({where:{order_id:pres.id}})
            const nr=await models.routes.findOne({where:{order_id:next.id}})
            const ar=await models.allroutes.findOne({where:{id:pr.route_id}})

            order.delivered_status=true
            order.order_status=4
            drord.delivered_status=true
            nr.flag=true
            pr.flag=false

            drord.save()
            order.save() 
            nr.save()
            pr.save()

        }
        res.send("success")
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.post('/ordercancel',jwtd,async (req,res)=>{
    const {pres,next,i,l}=req.body;
    try{
        
        if(i===l){
            
            const order=await models.allorders.findOne({where:{id:pres.id}})
            const drord=await models.driverorders.findOne({where:{order_id:pres.id}})
            const pr=await models.routes.findOne({where:{order_id:pres.id}})
            const ar=await models.allroutes.findOne({where:{id:pr.route_id}})
            
            order.delivered_status=true
            order.order_status=5
            drord.delivered_status=true
            ar.visited_status=true
            pr.flag=false

            drord.save()
            order.save()
            pr.save()
            ar.save()
        }
        else{
            const order=await models.allorders.findOne({where:{id:pres.id}})
            const drord=await models.driverorders.findOne({where:{order_id:pres.id}})
            const pr=await models.routes.findOne({where:{order_id:pres.id}})
            const nr=await models.routes.findOne({where:{order_id:next.id}})
            const ar=await models.allroutes.findOne({where:{id:pr.route_id}})

            order.delivered_status=true
            order.order_status=5
            drord.delivered_status=true
            nr.flag=true
            pr.flag=false

            drord.save()
            order.save() 
            nr.save()
            pr.save()

        }
        res.send("success")
    }
    catch(err){
        res.status(500).send(err)
    }
})


module.exports=router