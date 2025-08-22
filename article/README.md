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
  product_link TEXT NOT NULL,
  content TEXT NOT NULL,
  coverImage TEXT NOT NULL,
  type TEXT NOT NULL,
  language TEXT DEFAULT 'zh-CN',
  created_at TIMESTAMP DEFAULT NOW()
);
```

CREATE TABLE contact_msg (
 id SERIAL PRIMARY KEY,
 firstName TEXT NOT NULL,
 lastName TEXT NOT NULL,
 budget TEXT NOT NULL,
 email TEXT NOT NULL,
 message TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);
# 注意：supabase会自动将firstName改成firstname，将lastName改成lastname