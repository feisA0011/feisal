export type Testimonial = {
  name: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  productHandle?: string;
  createdAt: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Maja L.',
    location: 'Copenhagen',
    rating: 5,
    quote: 'Fast delivery and clear product information. Exactly the quality I expected.',
    productHandle: 'green-panda-daily-oil',
    createdAt: '2025-01-10'
  },
  {
    name: 'Jonas P.',
    location: 'Aarhus',
    rating: 4,
    quote: 'Simple checkout and transparent lab report references made me feel confident.',
    productHandle: 'green-panda-softgels',
    createdAt: '2025-01-18'
  },
  {
    name: 'Freja N.',
    rating: 5,
    quote: 'Clean taste, good packaging, and helpful support when I had shipping questions.',
    createdAt: '2025-01-24'
  },
  {
    name: 'Emil R.',
    location: 'Odense',
    rating: 4,
    quote: 'Great product pages with clear details and no overpromising language.',
    productHandle: 'green-panda-daily-oil',
    createdAt: '2025-02-01'
  }
];
