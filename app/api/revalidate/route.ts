import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { secret?: string; tags?: string[]; paths?: string[] };
  if (!env.REVALIDATE_SECRET || body.secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  (body.tags ?? []).forEach((tag) => revalidateTag(tag));
  (body.paths ?? []).forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, tags: body.tags ?? [], paths: body.paths ?? [] });
}
