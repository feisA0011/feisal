import type { Testimonial } from '@/content/testimonials';

export function getTestimonialsForProduct(items: Testimonial[], productHandle: string) {
  return items.filter((item) => item.productHandle === productHandle);
}

export function getAggregateRating(items: Testimonial[]) {
  if (items.length === 0) {
    return null;
  }

  const total = items.reduce((sum, item) => sum + item.rating, 0);
  const average = Number((total / items.length).toFixed(1));

  return {
    ratingValue: average,
    reviewCount: items.length
  };
}
