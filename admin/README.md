# 请使用pnpm管理依赖，使用pnpm dev运行项目
# 数据储存在supabase(https://supabase.com/)
# 建表语句如下：
```
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_group_id TEXT NOT NULL,
  title TEXT UNIQUE,
  product_link TEXT NOT NULL,
  content TEXT NOT NULL,
  coverImage TEXT NOT NULL,
  type TEXT NOT NULL,
  language TEXT DEFAULT 'zh-CN',
  created_at TIMESTAMP DEFAULT NOW()
);
```
```
CREATE TABLE lamp (
 model TEXT PRIMARY KEY,//型号
 "name-zh" TEXT,//中文名
 "name-en" TEXT,//英文名
 "abb-zh" TEXT,//中文简称
 "abb-en" TEXT,//英文简称
 inch NUMERIC,//英寸
 length NUMERIC,//长
 width NUMERIC,//宽
 height NUMERIC,//高
 type INTEGER CHECK (type IN (1, 2, 3, 4, 5, 6)),//分类:1.台灯 2.落地灯 3.吊灯 4.壁灯 5.小夜灯 6.其它
 "price-zh" NUMERIC,//国内价
 "price-en" NUMERIC,//国外价
 mt INTEGER CHECK (mt IN (1, 2, 3, 4, 5, 6)),//底座材质
 "main-images" TEXT[],//主图数组
 "detail-images" TEXT[],//细节图数组
 videos TEXT[]//视频数组
);
```