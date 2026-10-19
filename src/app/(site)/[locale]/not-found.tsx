import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/layout/Container';

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return { title: t('notFoundTitle') };
}

/** On-brand 404 — written in the site's literary voice, not the framework default. */
export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <Container className="py-24 md:py-36">
      <div className="mx-auto max-w-article text-center">
        <p className="eyebrow mb-6">{t('eyebrow')}</p>
        <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
          {t('heading')}
        </h1>
        <p className="mx-auto mb-10 max-w-md text-lg leading-8 text-text-secondary">
          {t('body')}
        </p>
        <Link href="/" className="btn-primary">
          {t('backHome')}
        </Link>
      </div>
    </Container>
  );
}
