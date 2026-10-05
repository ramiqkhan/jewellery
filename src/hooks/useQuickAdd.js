import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

// "Quick add" from a product grid card. Products that come in sizes can't be added
// without picking one, so those go to the product page instead of straight into the bag.
export function useQuickAdd() {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  return (product) => {
    if (product.sizes?.length > 0) {
      navigate(`/product/${product.slug || product._id}`);
      return;
    }

    addToCart({
      id: product._id,
      productId: product._id,
      title: product.name,
      price: product.price,
      image: product.images?.[0]?.url || '',
      size: '',
      quantity: 1,
    });

    if (typeof setIsCartOpen === 'function') setIsCartOpen(true);
  };
}
