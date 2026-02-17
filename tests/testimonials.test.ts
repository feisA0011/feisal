import { describe, expect, it } from 'vitest';
import type { Testimonial } from '@/content/testimonials';
import { productJsonLd } from '@/lib/seo/jsonld';
import { getAggregateRating, getTestimonialsForProduct } from '@/lib/testimonials';

const sample: Testimonial[] = [
  {
    name: 'A',
    rating: 5,
    quote: 'Great',
    productHandle: 'oil',
    createdAt: '2025-01-01'
  },
  {
    name: 'B',
    rating: 4,
    quote: 'Solid',
    productHandle: 'capsules',
    createdAt: '2025-01-02'
  },
  {
    name: 'C',
    rating: 4,
    quote: 'Nice',
    productHandle: 'oil',
    createdAt: '2025-01-03'
  }
];

describe('testimonials helpers', () => {
  it('filters testimonials by product handle', () => {
    const result = getTestimonialsForProduct(sample, 'oil');
    expect(result).toHaveLength(2);
    expect(result.every((item) => item.productHandle === 'oil')).toBe(true);
  });

  it('returns null aggregate rating for empty reviews', () => {
    expect(getAggregateRating([])).toBeNull();
  });
});

describe('productJsonLd aggregate rating behavior', () => {
  it('omits aggregateRating when there are no reviews', () => {
    const result = productJsonLd({
      name: 'Oil',
      description: 'Desc',
      price: '20.00',
      currencyCode: 'DKK',
      availability: 'https://schema.org/InStock',
      aggregateRating: null
    });

    expect(result).not.toHaveProperty('aggregateRating');
  });

  it('includes aggregateRating only when provided', () => {
    const result = productJsonLd({
      name: 'Oil',
      description: 'Desc',
      price: '20.00',
      currencyCode: 'DKK',
      availability: 'https://schema.org/InStock',
      aggregateRating: { ratingValue: 4.5, reviewCount: 8 }
    });

    expect(result).toHaveProperty('aggregateRating');
    expect(result.aggregateRating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: 4.5,
      reviewCount: 8
    });
  });
});
