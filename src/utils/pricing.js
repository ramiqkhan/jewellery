// Shared price/discount helpers. The backend already does the date-window math
// (via withPricing() on every product response) and sends the result as
// `onSale` + `finalPrice`, so the frontend just needs to read those - not
// recompute whether a sale is currently running.

export const formatPrice = (value) => `PKR ${Number(value || 0).toLocaleString()}`;

// Normalizes a product's pricing into what a price display needs, regardless of
// whether it's on sale right now.
export function getPricing(product) {
  const originalPrice = product?.price ?? 0;
  const onSale = !!product?.onSale;
  const finalPrice = onSale ? product?.finalPrice ?? originalPrice : originalPrice;
  const percent = onSale ? product?.discount?.percent ?? 0 : 0;

  return { onSale, originalPrice, finalPrice, percent };
}

// The price to actually charge - what goes into the cart/order, not just what's displayed.
export function payablePrice(product) {
  return getPricing(product).finalPrice;
}
