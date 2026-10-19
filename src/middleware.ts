import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Unprefixed URLs (including legacy inbound links) are redirected to /{locale}/... using the cookie, then Accept-Language.
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
