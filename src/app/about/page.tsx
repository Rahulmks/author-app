import Image from 'next/image';
import Container from '@/components/layout/Container';
import { getAboutPage } from '@/lib/pages/about-page';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <Container className="py-12 md:py-20">
      <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="manuscript-card rounded-[2rem] p-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-border-color bg-paper">
          <Image
            src={resolveImagePath(about?.image) ?? resolveImagePath('/images/author/profile.png') ?? '/images/author/profile.png'}
            alt={about?.name || 'எழுத்தாளரின் உருவப்படம்'}
            fill
            className="object-cover"
          />
          </div>
        </div>

        <div className="paper-panel rounded-[2rem] p-7 md:p-10">
          <p className="eyebrow mb-4">
            எழுத்தாளர் குறித்துப்
          </p>
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            {about?.title || 'நினைவின் எல்லையிலும் நிலத்தின் அடியொலியிலும் இருந்து எழுதுதல்.'}
          </h1>

          <div className="space-y-6 text-lg leading-8 text-text-secondary">
            <p>{about?.biography}</p>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-border-color pt-12">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">சிறப்புக் குறிப்புகள்</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            'இலக்கிய இதழ்களில் வெளிவந்த கட்டுரைகள் மற்றும் சிறுகதைகள்',
            'மொழி, நினைவு, இடம் குறித்து நடைபெற்ற உரையாடல்களில் பங்கேற்பு',
            'தமிழ் மற்றும் ஆங்கில இலக்கிய மரபுகளுக்கு இடையில் இயங்கும் படைப்புப் பணிகள்',
          ].map((item) => (
            <div key={item} className="manuscript-card rounded-[1.5rem] p-6">
              <p className="leading-7 text-text-secondary">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
