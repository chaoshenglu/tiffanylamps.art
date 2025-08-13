'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import styles from './page.module.css';

export default function HomeClient({ locale, posts, categories, translations }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 过滤文章
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1>{translations.title}</h1>
            <p>{translations.description}</p>
          </div>
          <LanguageSwitcher />
        </div>
        
        <div className={styles.controls}>
          <input
            type="text"
            placeholder={translations.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="all">{translations.allCategories}</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.posts}>
          {filteredPosts.length === 0 ? (
            <p className={styles.noResults}>{translations.noResults}</p>
          ) : (
            filteredPosts.map(post => (
              <article key={post._id} className={styles.post}>
                <h2>
                  <Link href={`/${locale}/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className={styles.description}>{post.description}</p>
                <div className={styles.meta}>
                  <time>{new Date(post.date).toLocaleDateString(
                    locale === 'zh-CN' ? 'zh-CN' : 
                    locale === 'zh-TW' ? 'zh-TW' : 
                    locale === 'ja' ? 'ja-JP' : 'en-US'
                  )}</time>
                  {post.category && <span className={styles.category}>{post.category}</span>}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}