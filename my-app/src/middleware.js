import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['zh-CN', 'zh-TW', 'en', 'ja'],
 
  // Used when no locale matches
  defaultLocale: 'zh-CN'
});
 
export const config = {
  // Match only internationalized pathnames and exclude dev/static assets
  matcher: [
    '/',
    '/(zh-CN|zh-TW|en|ja)/:path*',
    '/((?!api|_next|_vercel|favicon.ico|.*\..*|@vite).*)'
  ],
};