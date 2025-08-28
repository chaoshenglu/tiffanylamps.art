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
CREATE TABLE product (
 id SERIAL PRIMARY KEY,
 images TEXT[],
 "title_en" TEXT,
 "title_zh" TEXT,
 "html_en" TEXT,
 "html_zh" TEXT,
 "price_en" NUMERIC,
 "price_zh" NUMERIC
);
```