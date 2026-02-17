export type Money = { amount: string; currencyCode: string };

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage?: { url: string; altText?: string | null };
  priceRange: { minVariantPrice: Money };
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  products?: Product[];
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: Array<{
    id: string;
    quantity: number;
    merchandise: { id: string; product: { title: string; handle: string } };
  }>;
};
