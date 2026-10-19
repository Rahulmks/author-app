import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { getSession } from '@/lib/auth/auth';

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session) {
    redirect('/admin/dashboard');
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="paper-panel rounded-[2rem] p-8">
        <h1 className="mb-4 text-4xl font-semibold">Admin Sign In</h1>
        <p className="mb-6 text-text-secondary">Use your admin credentials to manage posts and media.</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
