var express=require('express');
var router=express.Router();
var jwtd=require('../jwt/jwt_driver')
router.get('/',jwtd,(req,res)=>{
    res.send('driver');
});
module.exports=router