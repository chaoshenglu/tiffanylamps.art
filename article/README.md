# Nuxt Minimal Starter

# 推荐环境
1. pnpm 10.14.0
2. node 22.18.0
3. npm 10.9.3

# 文章数据储存在supabase(https://supabase.com/)
# 建表语句如下：
```
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_group_id TEXT NOT NULL,
  title TEXT UNIQUE,
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
 tiktok_id TEXT,--tiktokID
 douyin_id TEXT--抖音ID
);
```

CREATE TABLE contact_msg (
 id SERIAL PRIMARY KEY,
 firstName TEXT NOT NULL,// 注意：supabase会自动将firstName改成firstname，将lastName改成lastname
 lastName TEXT NOT NULL,
 budget TEXT NOT NULL,
 email TEXT NOT NULL,
 message TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tiffany_moments (
 id SERIAL PRIMARY KEY,
 nickname TEXT,
 content TEXT,
 images TEXT[],
 approved BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMP DEFAULT NOW()
);
