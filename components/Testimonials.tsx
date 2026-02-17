import type { Testimonial } from '@/content/testimonials';
import { RatingStars } from '@/components/RatingStars';

export function Testimonials({
  items,
  title = 'What customers say'
}: {
  items: Testimonial[];
  title?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="testimonials-title" className="space-y-4">
      <h2 id="testimonials-title" className="text-2xl font-semibold">
        {title}
      </h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li key={`${item.name}-${item.createdAt}`} className="rounded-lg border border-zinc-200 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-medium">{item.name}</p>
              <RatingStars rating={item.rating} />
            </div>
            <p className="text-sm text-zinc-700">“{item.quote}”</p>
            <p className="mt-2 text-xs text-zinc-500">
              {item.location ? `${item.location} · ` : ''}
              {new Date(item.createdAt).toLocaleDateString('en-GB')}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
