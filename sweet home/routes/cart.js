const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//1.添加购物车
router.get('/add',(req,res)=>{
    var obj=req.query;
    var $cid=obj.cid;
    
    // var $pname=obj.pname;
    var $count=obj.count;
    if(!obj.cid){
        res.send({code:401,msg:'product_ required'});
        return;
    }
    // if(!obj.pname){
    //     res.send({code:401,msg:'pname required'});
    //     return;
    // }
    if(!obj.count){
        res.send({code:402,msg:'count required'});
        return;
    }
    if(!req.session.loginUid){
        console.log(req.session.loginUid)
        req.session.pageToJump='cart.html';
        req.session.tocid=obj.cid;
        // req.session.topname=obj.pname;
        req.session.tocount=obj.count;
        res.send({code:300,msg:'login required'});
        return;
    }
    var sql=`SELECT cid FROM sh_shopping_cart WHERE user_id=? AND product_id=?`;
    pool.query(sql,[req.session.loginUid,$cid],(err,result)=>{
        if(err) throw err;
        var sql2;
        
        if(result.length>0){
            sql2=`UPDATE sh_shopping_cart SET count=count+1 WHERE user_id=${req.session.loginUid} AND product_id=${$cid}`;

        }else{

            sql2=`INSERT INTO sh_shopping_cart VALUES(NULL, ${req.session.loginUid},${$cid},${$count}, false)`;
        }
        pool.query(sql2,(err,result2)=>{
            if(err) throw err;
            if(result2.affectedRows>0){
                res.send({code:200,msg:'添加成功'});
            }else{
                res.send({code:500,msg:'添加失败'});
            }
        });
    });
});
//2.购物车列表
router.get('/list',(req,res)=>{
    var output={};
    if(!req.session.loginUid){
        req.session.pageToJump='cart.html';
        res.send({code:300,msg:'需要先登录'});
        return;
    }
    var sql='SELECT l.product_name,title,price,count FROM sh_kinds l, sh_shopping_cart s WHERE l.product_id=s.product_id AND user_id=?';
    pool.query(sql,[req.session.loginUid],(err,result)=>{
        if(err) throw err;
        output.code=200;
        output.data=result;
        // for(var i=0;i<output.data.length;i++){
        //     var lid=output.data[i].lid;
        //     (function(lid,i){
        //       pool.query('SELECT sm FROM sh_kinds_pic WHERE kinds_id=? LIMIT 1',[lid],(err,result)=>{
        //         output.data[i].pic=result[0].sm;
        //       });
        //     })(lid,i);
        // }
        setTimeout(() => {
            res.send(output);
        }, 100);
    });
});
//3.删除购物车
router.get('/del',(req,res)=>{
    var obj=req.query;
    if(!obj.cid){
        res.send({code:401,msg:'cid required'});
        return;
    }
    if(!req.session.loginUid){
        res.send({code:300,msg:'需要先登录'});
        return;
    }
    pool.query('DELETE FROM sh_shopping_cart WHERE cid=?',[obj.cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'删除成功'});
        }else{
            res.send({code:500,msg:'删除失败'});
        }
    });
});


module.exports=router;