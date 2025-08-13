import { withContentlayer } from 'next-contentlayer';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withContentlayer(withNextIntl(nextConfig));
