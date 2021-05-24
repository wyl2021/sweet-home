const express = require("express"),
    router = express.Router(),
    pool = require("../pool.js");

//商品添加
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
//商品详情
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
            result[2][0].laptopList = result[3];
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
//删除商品
router.get("/delete", (req, res) => {
    let obj = req.query;
    if (!obj.product_name) {
        res.send({
            code: 401,
            msg: "删除失败"
        })
    }
    pool.query("delete from sh_kinds where product_name=?", [obj.product_name], (err, result) => {
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
//商品增加
// router.post("/add", (req, res) => {
//     let obj = req.query;
//     let temp = 400;
//     for (let key in obj) {
//         temp++
//         if (!obj[key]) {
//             res.send({
//                 code: temp,
//                 msg: "添加失败"
//             });
//             return;
//         }
//     }
//     pool.query("insert into sh_kinds (family_id,title,subtitle,price,promise,spec,lname,os,memory,resolution,video_card,cpu,video_memory,category,disk,details,shelf_time,sold_count,is_onsale) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [obj.family_id, obj.title, obj.subtitle, obj.price, obj.promise, obj.spec, obj.lname, obj.os, obj.memory, obj.resollution, obj.video_card, obj.cpu, obj.video_memory, obj.category, obj.disk, obj.details, obj.shelf_time, obj.sold_count, obj.is_onsale, ], (err, result) => {
//         if (err) throw err;
//         if (affectedRows > 0) {
//             res.send({
//                 code: 200,
//                 msg: "添加成功"
//             })
//         } else {
//             res.send({
//                 code: 301,
//                 msg: "添加失败"
//             })
//         }

//     })
// })

module.exports = router;