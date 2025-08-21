# Nuxt Minimal Starter

# 推荐环境
1. pnpm 10.14.0
2. node 22.18.0
3. npm 10.9.3

CREATE TABLE contact_msg (
 id SERIAL PRIMARY KEY,
 firstName TEXT NOT NULL,
 lastName TEXT NOT NULL,
 budget TEXT NOT NULL,
 email TEXT NOT NULL,
 message TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);