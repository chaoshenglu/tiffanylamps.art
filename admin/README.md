# 这是一个博客后台/文章管理系统
# 文章数据储存在supabase(https://supabase.com/)
# 建表语句如下：
```
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_group_id TEXT UNIQUE,
  title TEXT NOT NULL,
  product_link TEXT NOT NULL,
  content TEXT NOT NULL,
  coverImage TEXT NOT NULL,
  type TEXT NOT NULL,
  language TEXT DEFAULT 'zh-CN',
  created_at TIMESTAMP DEFAULT NOW()
);
```