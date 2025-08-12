'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { allPosts } from '../../.contentlayer/generated';
import styles from './page.module.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = [...new Set(allPosts.map(post => post.category))];
    return ['all', ...cats];
  }, []);

  // 过滤文章
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>我的博客</h1>
        <p>分享技术知识和经验</p>
      </header>

      <main className={styles.main}>
        {/* 搜索和筛选 */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? '全部分类' : category}
              </option>
            ))}
          </select>
        </div>

        {/* 文章列表 */}
        <div className={styles.postList}>
          {filteredPosts.length === 0 ? (
            <p className={styles.noResults}>没有找到匹配的文章</p>
          ) : (
            filteredPosts.map(post => (
              <article key={post._id} className={styles.postCard}>
                <Link href={post.url} className={styles.postLink}>
                  <h2>{post.title}</h2>
                  <p className={styles.postMeta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.date}>
                      {new Date(post.date).toLocaleDateString('zh-CN')}
                    </span>
                  </p>
                  {post.description && (
                    <p className={styles.description}>{post.description}</p>
                  )}
                </Link>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
