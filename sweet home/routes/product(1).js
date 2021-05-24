const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建空路由器
var router=express.Router();
//创建路由
//1.商品列表
//url: /list  method:get
router.get('/list',(req,res)=>{
  //获取数据
  var obj=req.query;
  var $pno=obj.pno;
  var $pageSize=obj.pageSize; 
  //验证页码
  if(!$pno) 
    $pno=1;
  else
    $pno=parseInt($pno);
  //验证每页大小
  if(!$pageSize)
    $pageSize=9;
  else
    $pageSize=parseInt($pageSize);
  var output={
    recordCount:0,
    pageSize:$pageSize,
    pageCount:0,
    pno:$pno, 
    data:[]
  };
  var sql1='SELECT COUNT(lid) AS a FROM sh_kinds';  
  //计算开始查询的值
  var start=($pno-1)*output.pageSize;  
  var count=output.pageSize;  
  var sql2 = 'SELECT lid,title,price,sold_count,is_onsale FROM sh_kinds  ORDER BY sold_count DESC LIMIT ?,?';
  //执行SQL语句，响应查询到的数据
  pool.query(sql1,(err,result)=>{
    if(err) throw err;
    console.log(result);
    output.recordCount=result[0].a;
    //计算总页数
    output.pageCount=Math.ceil(output.recordCount/output.pageSize);

  });

  pool.query(sql2,[start,count],(err,result)=>{
    if(err) throw err;
    console.log(result);   
    output.data=result;
    // for(var i=0;i<output.data.length;i++){
    //   var lid=output.data[i].lid;
    //   (function(lid,i){
    //     pool.query('SELECT md FROM sh_kinds_pic WHERE kinds_id=? LIMIT 0,1',[lid],(err,result)=>{
    //       output.data[i].pic=result[0].md;
    //     });
    //   })(lid,i);
    // }
    setTimeout(() => {
      res.send(output);
    }, 100);
  });
});

//2.商品详情
router.get("/detail", (req, res) => {
  let obj = req.query;
  if (!obj.lid) {
      res.send({
          code: 401,
          msg: "lid required"
      });
      return;
  };
  let sql = `SELECT * FROM sh_kinds WHERE lid=?;
             SELECT pid,kinds_id,sm,md,lg FROM sh_kinds_pic WHERE kinds_id=?;
             SELECT fid,fname FROM sh_kinds_family INNER JOIN sh_kinds ON 
             sh_kinds_family.fid = sh_kinds.product_id WHERE sh_kinds.lid = ?;
             SELECT lid,price FROM sh_kinds WHERE family_id IN (SELECT family_id FROM sh_kinds WHERE lid = ?); `;
  pool.query(sql, [obj.lid, obj.lid, obj.lid, obj.lid], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
          result[2][0] = result[3];
          res.send({
              code: 200,
              msg: "查找成功",
              details: result[0][0],
              picList: result[1],
              family: result[2][0]
          })
      } else {
          res.send({
              code: 301,
              msg: "查找失败"
          })
      }

  })
})
//3.商品删除
router.get("/delete", (req, res) => {
  let obj = req.query;
  if (!obj.lid) {
      res.send({
          code: 401,
          msg: "商品编号为空"
      })
  }
  pool.query("delete from sh_kinds where lid=?", [obj.lid], (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.affectedRows > 0) {
          res.send({
              code: 200,
              msg: "删除成功"
          });
      } else {
          res.send({
              code: 301,
              msg: "删除失败"
          });
      }
  })
})


//4.商品添加

router.post("/add", (req, res) => {
  var obj=req.body;
  if(!obj.product_id){
      res.send({code:401,msg:'product_id required'});
      return;
  }
  if(!obj.title){
      res.send({code:402,msg:'title required'});
      return;
  }
  if(!obj.price){
      res.send({code:403,msg:'price required'});
      return;
  }
  if(!obj.size){
      res.send({code:404,msg:'size required'});
      return;
  }
  if(!obj.product_name){
      res.send({code:405,msg:'product_name required'});
      return;
  }
  if(!obj.family_id){
      res.send({code:406,msg:'family_id required'});
      return;
  }
  if(!obj.details){
      res.send({code:407,msg:'details required'});
      return;
  }
  if(!obj.shelf_time){
      res.send({code:408,msg:'shelf_time required'});
      return;
  }
  if(!obj.sold_count){
      res.send({code:409,msg:'sold_count required'});
      return;
  }
  if(!obj.is_onsale){
      res.send({code:410,msg:'is_onsale required'});
      return;
  }
  // if(!req.session.loginUid){
  //     console.log(req.session.loginUid)
  //     req.session.pageToJump='cart.html';
  //     req.session.toproduct_name=obj.product_name;
  //     req.session.tocount=obj.count;
  //     res.send({code:300,msg:'login required'});
  //     return;
  // }
  let sql=`INSERT INTO sh_kinds
  (product_id,title,price,size,product_name,family_id,details,shelf_time,sold_count,is_onsale) 
  values(?,?,?,?,?,?,?,?,?,?)`
  pool.query(sql,[obj.product_id,obj.title,obj.price,obj.size,obj.product_name,obj.family_id,obj.details,obj.shelf_time,obj.sold_count,obj.is_onsale],(err,result)=>{
      if(err) throw err;
      console.log(result);
      if(result.affectedRows>0){
          res.send({code:200,msg:'添加成功'});
      }else{
          res.send({code:301,msg:'添加失败'});
      }
  });
});
//导出路由器
module.exports=router;
//在app.js服务器文件中挂载到/product下