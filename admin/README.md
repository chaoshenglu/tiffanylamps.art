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
 model TEXT PRIMARY KEY,--型号
 name_zh TEXT,--中文名
 name_en TEXT,--英文名
 amazon_id TEXT,--亚马逊ID
 tmall_id TEXT,--天猫ID
 abb_zh TEXT,--中文简称
 abb_en TEXT,--英文简称
 inch NUMERIC,--英寸
 length NUMERIC,--长
 width NUMERIC,--宽
 height NUMERIC,--高
 type INTEGER CHECK (type IN (1, 2, 3, 4, 5, 6)),--分类:1.台灯 2.落地灯 3.吊灯 4.壁灯 5.小夜灯 6.其它
 price_zh NUMERIC,--国内价
 price_en NUMERIC,--国外价
 mt INTEGER CHECK (mt IN (1, 2, 3, 4, 5, 6)),--底座材质:1.树脂 2.铸铁 3.合金 4.全铜 5.木 6.无底座
 main_images TEXT[],--主图数组
 detail_images TEXT[],--细节图数组
 videos TEXT[]--视频数组
);
```