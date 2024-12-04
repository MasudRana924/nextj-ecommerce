"use client";
import { removeFromCart } from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mt-44 px-4 md:px-8 mb-12">
      <div className="mx-auto w-full md:w-3/4 lg:w-10/12 border">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">
            <div className="w-full flex-1 bg-white p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Cart Information</h2>
              <div className="flow-root">
                {items && items.length > 0 ? (
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="w-40 h-40 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col space-y-8">
                          <div className="flex-none">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.name}</a>
                              </h3>
                              <p className="ml-4">{product.price}</p>
                            </div>
                          </div>
                          <div className="flex items-end justify-between text-sm flex-none">
                            <p className="text-gray-500">Qty: {product.quantity}</p>
                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => dispatch(removeFromCart(product.id))}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4 bg-white p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Shipping Information</h2>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${total}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/checkout"
                className="block w-full text-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
