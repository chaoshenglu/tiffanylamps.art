import { getTranslations, setRequestLocale } from 'next-intl/server';
import { allPosts } from '../../../.contentlayer/generated';
import HomeClient from './HomeClient.js';

export async function generateStaticParams() {
  return [
    { locale: 'zh-CN' },
    { locale: 'zh-TW' },
    { locale: 'en' },
    { locale: 'ja' }
  ];
}

export default async function Home({ params }) {
  // Next.js 15 动态路由参数需要 await 获取
  const { locale } = await params;
  
  // Tell next-intl which locale this branch renders for
  setRequestLocale(locale);
  
  const t = await getTranslations('blog');
  
  // 过滤当前语言的文章
  const localePosts = allPosts.filter(post => post.locale === locale);
  
  // 获取所有分类
  const categories = ['all', ...new Set(localePosts.map(post => post.category).filter(Boolean))];
  
  return (
    <HomeClient 
      locale={locale}
      posts={localePosts}
      categories={categories}
      translations={{
        title: t('title'),
        description: t('description'),
        searchPlaceholder: t('searchPlaceholder'),
        noResults: t('noResults'),
        allCategories: t('categories.all')
      }}
    />
  );
}
