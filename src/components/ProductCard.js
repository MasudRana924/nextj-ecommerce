"use client"
import { addToCart } from '@/store/slices/cartSlice';
import { useDispatch } from 'react-redux';


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.imageSrc} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-gray-700">{product.price}</p>
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded mt-2 hover:bg-indigo-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
