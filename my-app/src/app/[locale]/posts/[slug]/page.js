import { notFound } from 'next/navigation';
import { allPosts } from '../../../../../.contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateStaticParams() {
  const params = [];
  
  allPosts.forEach(post => {
    params.push({
      locale: post.locale,
      slug: post.slug
    });
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = allPosts.find(p => p.slug === slug && p.locale === locale);
  
  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }
  
  return {
    title: post.title,
    description: post.description
  };
}

export default async function PostPage({ params }) {
  const { locale, slug } = await params;
  
  // Tell next-intl which locale this branch renders for
  setRequestLocale(locale);
  
  const post = allPosts.find(p => p.slug === slug && p.locale === locale);
  
  if (!post) {
    notFound();
  }
  
  const MDXContent = getMDXComponent(post.body.code);
  
  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Link href={`/${locale}`} className={styles.backLink}>
            ← 返回首页
          </Link>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <time className={styles.date}>
              {new Date(post.date).toLocaleDateString(
                locale === 'zh-CN' ? 'zh-CN' : 
                locale === 'zh-TW' ? 'zh-TW' : 
                locale === 'ja' ? 'ja-JP' : 'en-US'
              )}
            </time>
            {post.category && (
              <span className={styles.category}>{post.category}</span>
            )}
          </div>
          {post.description && (
            <p className={styles.description}>{post.description}</p>
          )}
        </header>
        
        <div className={styles.content}>
          <MDXContent />
        </div>
      </article>
    </div>
  );
}