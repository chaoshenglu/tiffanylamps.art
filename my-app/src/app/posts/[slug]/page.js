import { notFound } from 'next/navigation';
import { allPosts } from '../../../../.contentlayer/generated';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === resolvedParams.slug);
  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // 直接使用HTML内容

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← 返回首页
      </Link>
      
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <time className={styles.date}>
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          {post.description && (
            <p className={styles.description}>{post.description}</p>
          )}
        </header>
        
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </article>
    </div>
  );
}