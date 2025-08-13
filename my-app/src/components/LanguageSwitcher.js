'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './LanguageSwitcher.module.css';

const locales = ['zh-CN', 'zh-TW', 'en', 'ja'];

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const pathname = usePathname();
  
  // 移除当前路径中的语言前缀
  const getLocalizedPath = (targetLocale) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '';
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  return (
    <div className={styles.languageSwitcher}>
      <span className={styles.label}>{t('label')}/Language:</span>
      {locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={getLocalizedPath(targetLocale)}
          className={`${styles.languageLink} ${targetLocale === locale ? styles.active : ''}`}
        >
          {t(targetLocale)}
        </Link>
      ))}
    </div>
  );
}