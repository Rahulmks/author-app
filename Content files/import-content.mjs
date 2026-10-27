// One-off helper for the author site. Talks to the site's OWN admin API (/api/auth, /api/posts),
// so slug rules, S3 writes, index sync and cache revalidation all go through the app's normal code.
//
// Usage (Node 18+):
//   BASE_URL=https://author-app-ecru.vercel.app ADMIN_EMAIL=... ADMIN_PASSWORD=... \
//     node import-content.mjs list                          # read-only: print every post/draft
//     node import-content.mjs import posts_payload.json     # dry run (prints plan only)
//     node import-content.mjs import posts_payload.json --apply
//     node import-content.mjs delete <id> [<id> ...] --apply   # only ids you pass explicitly
//
// It never deletes anything unless you pass explicit ids AND --apply.
// It does NOT touch S3 directly. Do NOT run scripts/s3-transfer-content.mjs (it prunes S3).
import { readFile } from 'node:fs/promises';

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
const [cmd, ...rest] = process.argv.slice(2);
const apply = rest.includes('--apply');
const args = rest.filter((a) => a !== '--apply');

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) { console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD.'); process.exit(1); }

async function login() {
  const res = await fetch(`${BASE}/api/auth`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed (${res.status}). Check ADMIN_EMAIL / ADMIN_PASSWORD for ${BASE}.`);
  const cookies = res.headers.getSetCookie?.() ?? [res.headers.get('set-cookie')].filter(Boolean);
  const session = cookies.map((c) => c.split(';')[0]).find((c) => c.startsWith('author_admin_session='));
  if (!session) throw new Error('Login succeeded but no session cookie was returned.');
  return session;
}

async function api(cookie, path, init = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init, redirect: 'manual',
    headers: { 'content-type': 'application/json', cookie, ...(init.headers || {}) },
  });
  if (res.status >= 300 && res.status < 400) throw new Error(`${path} redirected (session rejected?).`);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${path} -> ${res.status}: ${body.error || 'error'}`);
  return body;
}

const cookie = await login();
const { posts: existing } = await api(cookie, '/api/posts');

if (cmd === 'list') {
  console.log(`${existing.length} item(s) at ${BASE}`);
  for (const p of existing) console.log([p.id, p.status, p.category ?? '-', p.slug, p.publishedAt ?? '-', p.title].join(' | '));
} else if (cmd === 'import') {
  const { posts } = JSON.parse(await readFile(args[0], 'utf8'));
  const taken = new Set(existing.map((p) => p.slug));
  for (const p of posts) {
    if (taken.has(p.slug)) { console.log(`SKIP  ${p.slug} (slug already exists)`); continue; }
    if (!apply) { console.log(`PLAN  create ${p.status} ${p.category} ${p.slug} (${p.content.length} chars)`); continue; }
    const { post } = await api(cookie, '/api/posts', { method: 'POST', body: JSON.stringify(p) });
    console.log(`DONE  ${post.id}  ${post.slug}  -> ${BASE}/ta/posts/${post.slug}`);
  }
  if (!apply) console.log('Dry run only. Re-run with --apply to write.');
} else if (cmd === 'delete') {
  if (!args.length) { console.error('Pass explicit post ids.'); process.exit(1); }
  for (const id of args) {
    const p = existing.find((x) => x.id === id);
    if (!p) { console.log(`SKIP  ${id} (not found)`); continue; }
    if (!apply) { console.log(`PLAN  delete ${id} ${p.slug} "${p.title}"`); continue; }
    await api(cookie, '/api/posts', { method: 'DELETE', body: JSON.stringify({ id }) });
    console.log(`DONE  deleted ${id} ${p.slug}`);
  }
  if (!apply) console.log('Dry run only. Re-run with --apply to delete.');
} else {
  console.error('Commands: list | import <payload.json> [--apply] | delete <id>... [--apply]');
  process.exit(1);
}
