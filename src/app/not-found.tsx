import Link from 'next/link';
import Container from '@/components/layout/Container';

export const metadata = {
  title: 'இப்பக்கம் காணப்படவில்லை | எழுத்தாளர் இல்லம்',
};

/** On-brand 404 — written in the site's literary voice, not the framework default. */
export default function NotFound() {
  return (
    <Container className="py-24 md:py-36">
      <div className="mx-auto max-w-article text-center">
        <p className="eyebrow mb-6">பக்கம் தொலைந்துவிட்டது</p>
        <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
          இந்தப் பக்கத்தை யாரோ கிழித்து விட்டதுபோல் தெரிகிறது
        </h1>
        <p className="mx-auto mb-10 max-w-md text-lg leading-8 text-text-secondary">
          நீங்கள் தேடும் வரி இங்கு இல்லை. ஆனால் மற்ற பக்கங்களில் இன்னும் பல வரிகள் காத்திருக்கின்றன.
        </p>
        <Link href="/" className="btn-primary">
          முகப்புக்குத் திரும்புக
        </Link>
      </div>
    </Container>
  );
}
