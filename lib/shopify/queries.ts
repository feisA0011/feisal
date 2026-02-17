export const FEATURED_COLLECTIONS_QUERY = `#graphql
query FeaturedCollections {
  collections(first: 6) {
    nodes {
      id
      handle
      title
      description
    }
  }
}`;

export const COLLECTION_BY_HANDLE_QUERY = `#graphql
query CollectionByHandle($handle: String!, $first: Int = 12) {
  collection(handle: $handle) {
    id
    handle
    title
    description
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        availableForSale
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
}`;

export const PRODUCT_BY_HANDLE_QUERY = `#graphql
query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    handle
    title
    description
    availableForSale
    featuredImage { url altText }
    variants(first: 10) { nodes { id title availableForSale } }
    priceRange { minVariantPrice { amount currencyCode } }
  }
}`;

export const CART_FRAGMENT = `
fragment CartFields on Cart {
  id
  checkoutUrl
  totalQuantity
  lines(first: 50) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          product { title handle }
        }
      }
    }
  }
}`;

export const CART_CREATE_MUTATION = `#graphql
${CART_FRAGMENT}
mutation CartCreate($lines: [CartLineInput!]) {
  cartCreate(input: { lines: $lines }) {
    cart { ...CartFields }
    userErrors { message }
  }
}`;

export const CART_LINES_ADD_MUTATION = `#graphql
${CART_FRAGMENT}
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { ...CartFields }
    userErrors { message }
  }
}`;

export const CART_LINES_UPDATE_MUTATION = `#graphql
${CART_FRAGMENT}
mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart { ...CartFields }
    userErrors { message }
  }
}`;

export const CART_LINES_REMOVE_MUTATION = `#graphql
${CART_FRAGMENT}
mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart { ...CartFields }
    userErrors { message }
  }
}`;

export const CART_QUERY = `#graphql
${CART_FRAGMENT}
query Cart($cartId: ID!) {
  cart(id: $cartId) { ...CartFields }
}`;


export const FEATURED_PRODUCTS_QUERY = `#graphql
query FeaturedProducts($first: Int = 6) {
  products(first: $first, sortKey: BEST_SELLING) {
    nodes {
      id
      handle
      title
      description
      availableForSale
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
}`;
