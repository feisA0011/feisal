export function productJsonLd(input: {
  name: string;
  description: string;
  image?: string;
  price: string;
  currencyCode: string;
  availability: 'https://schema.org/InStock' | 'https://schema.org/OutOfStock';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: input.image,
    offers: {
      '@type': 'Offer',
      price: input.price,
      priceCurrency: input.currencyCode,
      availability: input.availability
    }
  };
}
