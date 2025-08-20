# 这是一个博客后台/文章管理系统
# 文章数据储存在supabase(https://supabase.com/)
# 建表语句如下：
```
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author DEFAULT 'Hauty',
  content TEXT NOT NULL,
  type TEXT DEFAULT 'culture',
  language TEXT DEFAULT 'zh-CN',
  created_at TIMESTAMP DEFAULT NOW()
);
```