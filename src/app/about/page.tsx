import Image from 'next/image';
import Container from '@/components/layout/Container';
import { getAboutPage } from '@/lib/pages/about-page';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <Container className="py-8 md:py-12">
      <div className="grid items-start gap-8 md:grid-cols-[280px_1fr] max-w-4xl mx-auto">
        <div className="w-full max-w-[280px] mx-auto space-y-4">
          <div className="border border-border-color/60 p-2.5 rounded-lg bg-paper/20">
            <div className="relative aspect-[4/5] overflow-hidden rounded bg-paper">
              <Image
                src={resolveImagePath(about?.image) ?? resolveImagePath('/images/author/profile.png') ?? '/images/author/profile.png'}
                alt={about?.name || 'எழுத்தாளரின் உருவப்படம்'}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Currently Status Note */}
          <div className="rounded-lg border border-border-color/60 bg-paper/40 p-4 text-xs space-y-2">
            <p className="font-semibold uppercase tracking-wider text-accent text-[0.68rem]">
              • தற்போது மேசையில்
            </p>
            <div className="text-text-secondary leading-relaxed space-y-1">
              <p><span className="text-text-primary font-medium">வாசிப்பது:</span> சங்க இலக்கிய நற்றிணை உரைகள்</p>
              <p><span className="text-text-primary font-medium">எழுதுவது:</span> நிலமும் நினைவும் நாவல் பணி</p>
            </div>
          </div>
        </div>

        <div className="border-l-2 border-accent pl-5 md:pl-8">
          <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
            எழுத்தாளர் குறித்து
          </p>
          <h1 className="mb-4 text-2xl font-semibold leading-snug md:text-4xl">
            {about?.title || 'நினைவின் எல்லையிலும் நிலத்தின் அடியொலியிலும் இருந்து எழுதுதல்.'}
          </h1>

          <div className="space-y-4 text-base md:text-lg leading-relaxed text-text-secondary">
            <p>{about?.biography}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border-color pt-8 max-w-4xl mx-auto">
        <h2 className="mb-4 text-xl font-semibold md:text-2xl">சிறப்புக் குறிப்புகள்</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            'இலக்கிய இதழ்களில் வெளிவந்த கட்டுரைகள் மற்றும் சிறுகதைகள்',
            'மொழி, நினைவு, இடம் குறித்து நடைபெற்ற உரையாடல்களில் பங்கேற்பு',
            'தமிழ் மற்றும் ஆங்கில இலக்கிய மரபுகளுக்கு இடையில் இயங்கும் படைப்புப் பணிகள்',
          ].map((item) => (
            <div key={item} className="border-t border-border-color/60 pt-4">
              <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
