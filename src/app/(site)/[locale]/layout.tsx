import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import '../../../styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fontVariables } from '@/lib/fonts';
import { isLocale, locales } from '@/i18n/routing';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#93CBC4',
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://author-app-ecru.vercel.app'),
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className={`${fontVariables} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
