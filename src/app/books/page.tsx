import Container from '@/components/layout/Container';
import BookCard from '@/components/books/BookCard';
import EmptyState from '@/components/ui/EmptyState';
import { getBooks } from '@/lib/books/get-books';

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <p className="eyebrow mb-4">
          நூல்கள்
        </p>
        <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
          வெளியான படைப்புகள்
        </h1>
        <p className="text-lg leading-8 text-text-secondary">
          கற்பனை, கட்டுரை, இலக்கிய மனப்பதிவுகள் ஆகிய வடிவங்களில் நினைவும் நகர்வும் அன்றாட இடங்களின்
          உள் உலகமும் இங்கு சேர்கின்றன.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <EmptyState message="புதிய நூல்கள் தற்சமயம் அச்சில் உள்ளன. விரைவில் இங்கு வந்து சேரும்." />
      )}
    </Container>
  );
}
