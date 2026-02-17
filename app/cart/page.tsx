import { cookies } from 'next/headers';
import Link from 'next/link';
import { getCart } from '@/lib/shopify/cart';

export const metadata = {
  title: 'Cart',
  robots: { index: false, follow: false }
};

export default async function CartPage() {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = cartId ? await getCart(cartId).catch(() => null) : null;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Cart</h1>
      {!cart ? <p className="mt-3 text-zinc-600">Your cart is empty.</p> : null}
      {cart ? (
        <>
          <ul className="mt-4 space-y-2">
            {cart.lines.map((line) => (
              <li key={line.id} className="rounded border p-3">
                <p>{line.merchandise.product.title}</p>
                <p className="text-sm text-zinc-600">Qty: {line.quantity}</p>
              </li>
            ))}
          </ul>
          <Link href={cart.checkoutUrl} className="mt-4 inline-block rounded bg-zinc-900 px-4 py-2 text-white">
            Checkout in Shopify
          </Link>
        </>
      ) : null}
    </div>
  );
}
