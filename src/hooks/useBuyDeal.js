import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { getPricing, payablePrice } from '../utils/pricing';

const inStock = (product) =>
  product.sizes?.length > 0 ? product.sizes.some((size) => (size.stock ?? 0) > 0) : (product.stock ?? 0) > 0;

// What "Buy This Deal" would add: every in-stock piece that doesn't need a size picked first.
// Sized pieces can't go in the cart without a size, so the shopper picks those on the product page.
export function dealBundle(deal) {
  const available = (deal?.products || []).filter(inStock);
  const items = available.filter((product) => !(product.sizes?.length > 0));
  const needsSize = available.filter((product) => product.sizes?.length > 0);
  const total = items.reduce((sum, product) => sum + payablePrice(product), 0);
  const originalTotal = items.reduce((sum, product) => sum + getPricing(product).originalPrice, 0);
  return { items, needsSize, total, originalTotal };
}

// Adds the whole deal to the cart at the deal price and goes straight to checkout
export function useBuyDeal() {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  return (deal) => {
    const { items } = dealBundle(deal);
    if (!items.length) return;

    for (const product of items) {
      addToCart({
        id: product._id,
        productId: product._id,
        title: product.name,
        price: payablePrice(product),
        image: product.images?.[0]?.url || '',
        size: '',
        quantity: 1,
      });
    }

    // addToCart opens the drawer; skip it and go to checkout
    setIsCartOpen(false);
    navigate('/checkout');
  };
}
