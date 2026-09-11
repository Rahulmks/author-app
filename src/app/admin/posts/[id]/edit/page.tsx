export default function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="paper-panel rounded-[2rem] p-8">
        <h1 className="mb-4 text-4xl font-semibold">பதிவு திருத்தம்: {params.id}</h1>
        <p className="text-text-secondary">பதிவு திருத்தப் படிவம் இங்கு இணைக்கப்படும்.</p>
      </div>
    </main>
  );
}
