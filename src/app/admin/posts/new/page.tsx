import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/auth/auth';

export default async function NewPostPage() {
  await requireAdminSession();
  redirect('/admin/posts');
}
