SET NAMES UTF8;
DROP DATABASE IF EXISTS sh;
CREATE DATABASE sh CHARSET=UTF8;
USE sh;

/**顾客信息**/
CREATE TABLE sh_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  gender INT                  #性别  0-女  1-男
);

/**收货地址信息**/
CREATE TABLE sh_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                #顾客编号
  receiver VARCHAR(16),       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机
  fixedphone VARCHAR(16),     #固定电话
  postcode CHAR(6),           #邮编
  is_default BOOLEAN          #是否为当前用户的默认收货地址
);

/**顾客购物车列表**/
CREATE TABLE sh_shopping_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id  INT,    #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买

);

/**顾客订单表**/
CREATE TABLE sh_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,    #顾客id
  user_name VARCHAR(32),    #顾客名称
  product_id  VARCHAR(32),  #产品编号
  status INT,               #订单状态  
  order_time DATETIME,      #下单时间
  pay_time DATETIME,        #付款时间
  deliver_time DATETIME,    #发货时间
  received_time DATETIME    #签收时间
)AUTO_INCREMENT=10000000;

/**顾客订单详情表**/
CREATE TABLE sh_order_detail(
did INT PRIMARY KEY AUTO_INCREMENT,
product_name  VARCHAR(32),    #商品名字  
order_id INT,     #订单编号
product_id  INT,  #产品编号
count     INT     #购买数量
);

/**商品类别表**/
CREATE TABLE sh_kinds_family(
fid INT PRIMARY KEY AUTO_INCREMENT,
fname VARCHAR(32)   #类别名称
);

/**商品表**/
CREATE TABLE sh_kinds(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  product_id  INT,            #产品编号
  title VARCHAR(128),         #主标题
  price DECIMAL(10,2),        #价格
  size VARCHAR(64),           #规格
  product_name VARCHAR(32),   #商品名称
  family_id  VARCHAR(10),     #类别分类
  details VARCHAR(1024),      #甜品详细说明
  shelf_time BIGINT,          #上架时间
  sold_count INT,             #已售出的数量
  is_onsale BOOLEAN           #是否促销中
);

/**商品详情图表**/
CREATE TABLE sh_kinds_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  kinds_id INT,               #甜品编号
  sm    VARCHAR(128),          #小图片路径
  md   VARCHAR(128),          #中图片路径 
  lg   VARCHAR(128)           #大图片路径
);

/****首页轮播广告商品****/
CREATE TABLE sh_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),    #图片路径
  title VARCHAR(64),   #图片描述
  href VARCHAR(128)    #图片链接
);

/****首页商品****/
CREATE TABLE sh_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),       #商品标题
  details VARCHAR(128),    #详细描述
  pic VARCHAR(128),        #图片
  price DECIMAL(10,2),     #商品价格
  href VARCHAR(128),       #链接地址
  seq_recommended TINYINT, #热销推荐
  seq_new_arrival TINYINT, #最新上市
  seq_top_sale TINYINT      #销售top
);

/*******************/
/******数据导入******/
/*******************/
/**顾客信息**/
INSERT INTO sh_user VALUES
(NULL, 'dingding', '123456', 'ding@qq.com', '13501234567',  '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568',  '1'),
(NULL, 'doudou', '123456', 'dou@qq.com', '13501234569',  '1'),
(NULL, 'yaya', '123456', 'ya@qq.com', '13501234560','0');


/**收货地址信息**/
INSERT INTO sh_receiver_address VALUES
('1', '10', 'dingding', '浙江省', '宁波市', '江北区', '风华路495号', '15123154661', '0574-86328000', '315200', '0'),
('2', '11', 'dangdang', '浙江省', '宁波市', '镇海区', '庄市街道', '16524598745', '0574-12345678', '315260', '1'),
('3', '12', 'doudou', '浙江省', '宁波市', '镇海区', '宁大步行街', '17854625314', '0574-85423516', '315200', '0'),
('4', '13', 'yaya', '浙江省', '宁波市', '镇海区', '宁大二村', '13524615793', '0574-86512345', '315200', '1');



/**顾客购物车列表**/
INSERT INTO sh_shopping_cart VALUES
('1','1','1','1','1'),
('2','2','1','1','1'),
('3','3','2','1','1'),
('4','4','2','1','1'),
('5','5','3','1','1'),
('6','6','2','1','1'),
('7','7','3','1','1');





/**顾客订单表**/
INSERT INTO sh_order VALUES
('1','1','dingding','1','1','2021-01-02 17:58','2021-01-02 18:00','2021-01-03 08:00','2021-01-04 10:00'),
('2','2','dangdang','1','1','2021-01-05 07:33','2021-01-05 08:00','2021-01-07 15:00','2021-01-08 17:00'),
('3','3','doudou','1','1','2021-01-12 08:40','2021-01-12 18:00','2021-01-15 10:00','2021-01-16 19:00'),
('4','4','yaya','1','1','2021-02-02 19:56','2021-02-02 20:00','2021-02-04 18:00','2021-02-04 20:00');



/**顾客订单详情表数据**/
INSERT INTO sh_order_detail VALUES
('1','黑森林蛋糕','1','1','5'),
('2','黑森林蛋糕','1','1','5'),
('3','黑森林蛋糕','1','1','5'),
('4','黑森林蛋糕','1','1','5');

/**商品类别表数据**/
INSERT INTO sh_kinds_family VALUES
('1',"蛋糕类"),
('2',"冰淇淋类"),
('3',"饮料类");


/**商品信息**/
INSERT INTO sh_kinds VALUES
(1, '1','怎么表达,都能称职', '234', '6寸',   '黑森林蛋糕',           '蛋糕类',  '制作原料主要有脆饼面团底托、鲜奶油、樱桃酒等。它融合了樱桃的酸、奶油的甜、樱桃酒的醇香',                                                                             '2021-10-1',  '8343', '1'),
(2, '2','怎么表达,都能称职', '456', '7寸',   '维也纳巧克力杏仁蛋糕', '蛋糕类',  '杏仁粉85g、糖粉75g、蛋糕粉25g、蛋120g(2只)、蛋清80g、糖10g、黄油30g、黑巧克力50g',                                                                                   '2021-10-11', '3245', '1'),
(3, '3','怎么表达,都能称职', '486', '7寸',   '起士蛋糕',             '蛋糕类',  '起士蛋糕是以奶油起士、玉米粉、细砂糖为原料制成的糕点。',                                                                                                             '2021-10-5',  '3245', '1'),
(4, '4','怎么表达,都能称职', '386', '7寸',   '布朗尼蛋糕',           '蛋糕类',  '布朗尼的原料通常包括坚果霜状白糖生奶油巧克力等',                                                                                                                     '2021-10-15', '1245', '0'),
(5, '5','怎么表达,都能称职', '486', '5寸',   '柠檬芝士蛋糕',         '蛋糕类',  '原料主要有奶油芝士筋面粉玉米淀粉',                                                                                                                                   '2021-10-13', '3245', '1'),
(6, '6','怎么表达,都能称职', '486', '9寸',   '红丝绒蛋糕',           '蛋糕类',  '制作原料主要有低筋面粉、鸡蛋、红丝绒专用食用色素、奶油奶酪(即奶油芝士)、奶油等。冷却后，涂上奶油奶酪奶油霜做的馅料。',                                               '2021-10-1',  '2358', '1'),
(7, '7','让生活从清新开始',   '15',  '250ml', '维也纳咖啡',           '饮品类',  '在湿热的咖啡杯底部撒上薄薄一层砂糖或细冰糖，接着向杯中倒入滚烫而且偏浓的黑咖啡，最后在咖啡表面装饰两勺冷的新鲜奶油，一杯经典的维也纳咖啡就做好了。',                 '2021-10-11', '8341', '1'),
(8, '8','让生活从清新开始',   '24',  '250ml', '土耳其咖啡',           '饮品类',  '在奶盆里倒入研细的深煎炒咖啡和肉桂等香料,搅拌均匀,然后倒入锅里,加些水煮沸3次,从火上拿下。待粉末沉淀后,将清澈的液体倒入杯中,这时慢慢加入橙汁和蜂蜜即成。',            '2021-10-11', '3145', '1'),
(9, '9','让生活从清新开始',   '12',  '250ml', '拿铁咖啡',             '饮品类',  '这是一种含有蒸牛奶的浓咖啡，在一些咖啡店里，咖啡顶部会有少量泡沫。它比卡布奇诺咖啡的泡沫要少一些。',                                                                 '2021-10-5',  '3245', '1'),
(10,'10','让生活从清新开始',   '14',  '250ml', '蓝山咖啡',             '饮品类',  '纯牙买加蓝山咖啡将咖啡中独特的酸、苦、甘、醇等味道完美地融合在一起，形成强烈诱人的优雅气息，是其它咖啡望尘莫及的。',                                                 '2021-10-15', '1275', '0'),
(11,'11','让生活从清新开始',   '16',  '250ml', '卡布奇诺咖啡 ',        '饮品类',  '卡布奇诺咖啡是另一种浓咖啡，含有50%蒸牛奶和50%泡沫牛奶。也可以说含有1/3浓咖啡,1/3蒸牛奶和1/3泡沫牛奶。',                                                            '2021-10-13', '3245', '1'),
(12,'12','让生活从清新开始',   '19',  '250ml', '摩卡咖啡',             '饮品类',  '配制方法：在杯中加入巧克力糖浆20毫升和很浓的深煎炒咖啡，搅拌均匀，加入1大匙奶油浮在上面,削一些巧克力末作装饰，最后再添加一些肉桂棒。',                              '2021-10-1',  '7358', '1'),
(13,'13','凉在嘴里,暖在心里', '59',  '250g',  '红粉佳人',             '冰淇淋类','草莓冰淇淋搭配桑果雪芭，加上娇艳欲滴的桑果，叫人无法抵挡这诱惑！',                                                                                                   '2021-10-1',  '2358', '1'),
(14,'14','凉在嘴里,暖在心里', '125', '250g',  '球球大作战',           '冰淇淋类','七大经典热卖口味，精心混搭在华夫碗中，一次满足你对甜蜜的所有渴望。',                                                                                                 '2021-10-1',  '8343', '1'),
(15,'15','凉在嘴里,暖在心里', '120', '350g',  '花花宇宙',             '冰淇淋类','清脆的法式蛋白饼、多重果味冰淇淋、雪芭雪泥与薄荷冻的缤纷点缀，凑响味觉的清凉乐章。',                                                                                 '2021-10-11', '3245', '1'),
(16,'16','凉在嘴里,暖在心里', '59',  '850g',  '啡色梦境',             '冰淇淋类','咖啡冰淇淋搭配比利时巧克力冰淇淋，缀以咖啡吉利冻和巧克力，和谐交融的口感在舌尖绽放,宛如神秘浪漫的梦境。',                                                           '2021-10-5',  '3245', '1'),
(17,'17','凉在嘴里,暖在心里', '77',  '450g',  '巧克力礼赞',           '冰淇淋类','诱人的巧克力球内,蕴藏四种口味的冰淇淋球与香脆果仁。当浓香热巧克力酱浇灌而下,球内的奇妙世界引入眼帘',                                                               '2021-10-15', '1245', '0'),
(18,'18','凉在嘴里,暖在心里', '66',  '500g',  '哈瓦那黄昏 ',          '冰淇淋类','哈瓦那的黄昏,光影处是芒果雪芭和橙汁苏打水荟萃的金黄,薄荷味映出一夏清凉。',                                                                                       '2021-10-13', '5670', '1');


/**商品图片信息**/
INSERT INTO sh_kinds_pic VALUES
('1', '1','img/product/sm/57b12a31N8f4f75a3.jpg','img/product/md/57b12a31N8f4f75a3.jpg','img/product/lg/57b12a31N8f4f75a3.jpg'),
('2', '1','img/product/sm/57ad359dNd4a6f130.jpg','img/product/md/57ad359dNd4a6f130.jpg','img/product/lg/57ad359dNd4a6f130.jpg'),
('3', '1','img/product/sm/57ad8846N64ac3c79.jpg','img/product/md/57ad8846N64ac3c79.jpg','img/product/lg/57ad8846N64ac3c79.jpg'),
('4', '1','img/product/sm/57b12a31N8f4f75a3.jpg','img/product/md/57b12a31N8f4f75a3.jpg','img/product/lg/57b12a31N8f4f75a3.jpg'),
('5', '1','img/product/sm/57ad359dNd4a6f130.jpg','img/product/md/57ad359dNd4a6f130.jpg','img/product/lg/57ad359dNd4a6f130.jpg'),
('6', '1','img/product/sm/57ad8846N64ac3c79.jpg','img/product/md/57ad8846N64ac3c79.jpg','img/product/lg/57ad8846N64ac3c79.jpg'),
('7', '2','img/product/sm/57b12a31N8f4f75a3.jpg','img/product/md/57b12a31N8f4f75a3.jpg','img/product/lg/57b12a31N8f4f75a3.jpg'),
('8', '2','img/product/sm/57ad359dNd4a6f130.jpg','img/product/md/57ad359dNd4a6f130.jpg','img/product/lg/57ad359dNd4a6f130.jpg'),
('9', '2','img/product/sm/57ad8846N64ac3c79.jpg','img/product/md/57ad8846N64ac3c79.jpg','img/product/lg/57ad8846N64ac3c79.jpg'),
('10','2','img/product/sm/57b12a31N8f4f75a3.jpg','img/product/md/57b12a31N8f4f75a3.jpg','img/product/lg/57b12a31N8f4f75a3.jpg'),
('11','2','img/product/sm/57ad359dNd4a6f130.jpg','img/product/md/57ad359dNd4a6f130.jpg','img/product/lg/57ad359dNd4a6f130.jpg'),
('12','2','img/product/sm/57ad8846N64ac3c79.jpg','img/product/md/57ad8846N64ac3c79.jpg','img/product/lg/57ad8846N64ac3c79.jpg'),
('14','3','img/product/sm/57e1ff09Nf610fea3.jpg','img/product/md/57e1ff09Nf610fea3.jpg','img/product/lg/57e1ff09Nf610fea3.jpg'),
('15','3','img/product/sm/57e1ff17N286390a9.jpg','img/product/md/57e1ff17N286390a9.jpg','img/product/lg/57e1ff17N286390a9.jpg'),
('16','3','img/product/sm/57e1ff2fN8a36d0fe.jpg','img/product/md/57e1ff2fN8a36d0fe.jpg','img/product/lg/57e1ff2fN8a36d0fe.jpg'),
('17','3','img/product/sm/57e52dffNa4d8ce2c.jpg','img/product/md/57e52dffNa4d8ce2c.jpg','img/product/lg/57e52dffNa4d8ce2c.jpg'),
('18','3','img/product/sm/57e52e03N4ec367dd.jpg','img/product/md/57e52e03N4ec367dd.jpg','img/product/lg/57e52e03N4ec367dd.jpg');

/****首页轮播广告商品****/
INSERT INTO sh_index_carousel VALUES
(NULL, 'img/index/banner1.png','轮播广告商品1','product_details.html?lid=28'),
(NULL, 'img/index/banner2.png','轮播广告商品2','product_details.html?lid=19'),
(NULL, 'img/index/banner3.png','轮播广告商品3','lookforward.html'),
(NULL, 'img/index/banner4.png','轮播广告商品4','lookforward.html');

/****首页商品****/
INSERT INTO sh_index_product VALUES
(NULL, '黑森林蛋糕', '蛋糕类', 'img/index/study_computer_img1.png', 6988, 'product_details.html?lid=1', 1, 1, 1),
(NULL, '维也纳巧克力杏仁蛋糕', '蛋糕类', 'img/index/study_computer_img2.png', 3488, 'product_details.html?lid=5', 2, 2, 2),
(NULL, '摩卡咖啡', '饮品类', 'img/index/study_computer_img3.png', 5399, 'product_details.html?lid=9', 3, 3, 3),
(NULL, '巧克力礼赞', '冰淇淋类', 'img/index/study_computer_img4.png', 4966, 'product_details.html?lid=13', 4, 4, 4),
(NULL, '花花宇宙', '冰淇淋类', 'img/index/study_computer_img5.png', 6299, 'product_details.html?lid=17', 5, 5, 5),
(NULL, '蓝山咖啡', '冰淇淋类', 'img/index/study_computer_img3.png', 5199, 'product_details.html?lid=19', 6, 6, 6),
(NULL, '红粉佳人', '冰淇淋类', 'img/index/study_computer_img4.png', 5799, 'product_details.html?lid=38', 0, 0, 0);
