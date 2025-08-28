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
 model TEXT PRIMARY KEY,
 "name-zh" TEXT,
 "name-en" TEXT,
 "abb-zh" TEXT,
 "abb-en" TEXT,
 inch NUMERIC,
 length NUMERIC,
 width NUMERIC,
 height NUMERIC,
 type INTEGER CHECK (type IN (1, 2, 3, 4, 5, 6)),
 "price-zh" NUMERIC,
 "price-en" NUMERIC,
 mt INTEGER CHECK (mt IN (1, 2, 3, 4, 5, 6)),
 "main-images" TEXT[],
 "detail-images" TEXT[],
 videos TEXT[]
);
```