//用户路由器，包含很多用户相关的路由
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');

//创建路由器对象，
let router=express.Router();
//挂载路由
//1.顾客注册， post    /reg
router.post('/reg',(req,res)=>{
    //获取表单数据
    let obj=req.body;
   
    //验证各项数据是否为空
    if(!obj.uname){
        res.send({code:401,msg:'姓名为空'});
        //阻止往下执行
        return;
    }
    if(!obj.upwd){
        res.send({code:402,msg:'密码为空'});
        //阻止往下执行
        return;
    }
    if(!obj.email){
        res.send({code:403,msg:'邮箱为空'});
        //阻止往下执行
        return;
    }
    if(!obj.phone){
        res.send({code:404,msg:'手机为空'});
        //阻止往下执行
        return;
    }
    if(!obj.gender){
        res.send({code:406,msg:'性别为空'});
        //阻止往下执行
        return;
    }
    // pool.query('INSERT INTO sh_user SET ?',[obj],(err,result)=>{
    //     if(err) throw err;
    //     console.log(result);
    //     if(result.affectedRows>0){
    //         res.send({code:200,msg:'注册成功'});
    //     }else{
    //         res.send({code:301,msg:'注册失败'});
    //     }
    // });

    pool.query('INSERT INTO sh_user(uname,upwd,email,phone,gender) values(?,?,?,?,?)',[obj.uname,obj.upwd,obj.email,obj.phone,obj.gender],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.affectedRows>0){
            res.send({code:200,msg:'注册成功'});
        }else{
            res.send({code:301,msg:'注册失败'});
        }
    });
    
});

//2.顾客登录  post  /login
router.post('/login',(req,res)=>{
     //获取表单数据
     let obj=req.body;
     //验证表单数据是否为空
    if(!obj.uname){
        res.send({code:401,msg:'顾客名为空'});
        //阻止往下执行
        return;
    }
    if(!obj.upwd){
        res.send({code:402,msg:'密码为空'});
        //阻止往下执行
        return;
    }
    //执行SQL语句
    pool.query('SELECT * FROM sh_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
        if(err)  throw err;
        console.log(result);
        //返回的数组，如果查到相应的用户，数组中就会出现这数据，否则没查找到，返回空数组，登录失败。
        if(result.length>0){
             req.session.loginUname=obj.uname;
             req.session.loginUid=result[0].uid;
             console.log(req.session);
             res.send({code:200,msg:'登录成功'});
            //  window.location.href="user_list.html"
        }else{
            res.send({code:301,msg:'登录失败'});
        }
    });
});

//3.查询顾客订单  get  /detail
router.get('/detail',(req,res)=>{
    var output={};
    if(!req.session.loginUid){
        req.session.pageToJump='cart.html';
        res.send({code:300,msg:'需要先登录'});
        return;
    }
    var sql='SELECT user_name,order_time,pay_time,product_name,count FROM sh_order l, sh_order_detail s WHERE l.product_id=s.product_id AND user_name=?';
    pool.query(sql,[req.session.loginUname],(err,result)=>{
        if(err) throw err;
        output.code=200;
        output.data=result;
        setTimeout(() => {
            res.send(output);
        }, 100);
    });
});

4.//注销顾客信息  get /delete
router.get('/delete',(req,res)=>{ 
    //获取表单数据
    let obj=req.query;
    console.log(obj);
        //验证各项数据是否为空
        if(!obj.uid){
            res.send({code:401,msg:'编号为空'})
            //阻止往下执行
            return;
        }
        //执行sql语句
        pool.query('DELETE FROM sh_user WHERE uid=?',[obj.uid],(err,result)=>{
            if(err) throw err;
              console.log(result); //如果数据插入成功，响应对象
              //返回的数组，如果数组长度大于0，则检索到该用户，否则检索不到
             if(result.affectedRows>0){
                res.send({code:200,msg:'成功注销'});
             }else{
                res.send({code:401,msg:'注销失败'});
             };

    });

});

//5.修改顾客信息  get    /update
router.get('/update',(req,res)=>{
   //获取数据
   let obj=req.query;
   console.log(obj);
   //验证数据是否为空, 遍历对象，访问每个属性，如果属性值为空，提示属性名那一项是必须的
   if(!obj.uid){
    res.send({code:401,msg:'编号为空'})
    //阻止往下执行
    return;
}
if(!obj.uname){
    res.send({code:402,msg:'姓名为空'})
    //阻止往下执行
    return;
}
if(!obj.upwd){
    res.send({code:403,msg:'密码为空'})
    //阻止往下执行
    return;
}
if(!obj.email){
    res.send({code:404,msg:'邮箱为空'})
    //阻止往下执行
    return;
}
if(!obj.phone){
    res.send({code:405,msg:'手机为空'})
    //阻止往下执行
    return;
}

  
   //执行SQL语句
   pool.query('UPDATE sh_user set uname=?,upwd=?,email=?,phone=? WHERE uid=?',[obj.uname,obj.upwd,obj.email,obj.phone,obj.uid],(err,result)=>{
       if(err) throw err;
       if(result.affectedRows>0){
        res.send({code:200,msg:'修改成功'});
       }else{
        res.send({code:301,msg:'修改失败'});
       }
   });
});

//6.顾客列表  get /list
router.get('/list',(req,res)=>{
    //获取数据
    let obj=req.query;
    console.log(obj);
    //验证是否为空 用默认值来实现
    if(!obj.pno) obj.pno=1;
    if(!obj.count) obj.count=2;
    //将count转为整形
    obj.count= parseInt(obj.count);
    //计算 start
    let start=(obj.pno-1)*obj.count;
    //执行查询
    pool.query('SELECT * FROM sh_user limit ?,?',[start,obj.count],(err,result)=>{
        if(err)  throw err;
        console.log(result);
        //返回的数组，如果数组长度大于0，则查询到顾客，否则查询不到。
        if(result.length>0){
            res.send({
                code:200,
                msg:'顾客查询成功',
                data:result
            });
        }else{
            res.send({code:301,msg:'顾客查询失败'});
        }
       });


});

//退出登录
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send({code:200,msg:'退出登录成功'});
  });
  //返回当前登录顾客的信息
  router.get('/sessiondata',(req,res)=>{
    res.send({uid:req.session.loginUid,uname:req.session.loginUname});
  });


//导出路由器对象
module.exports=router;