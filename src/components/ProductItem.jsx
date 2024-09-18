import { useContext } from 'react';
import { formatMoney } from '../utils/formatData';
import './cart.scss';
import { ProductProvider } from '../providers/ProductContext';

export default function ProductItem({ product }) {
  const { handleAddToCart } = useContext(ProductProvider);

  return (
    <>
      <div className="border rounded shadow-md">
        <img className="w-full max-h-[300px] min-h-[300px] object-contain" src={product.image} alt="" />
        <div className="p-4 flex flex-col gap-4 flex-1">
          <h3 className="product-item">{product.productName}</h3>
          <div className="text-center">{formatMoney(product.price)}</div>
          <div className="text-center ">
            <button
              onClick={() => handleAddToCart(product)}
              className="outline-none bg-blue-500 text-white hover:bg-blue-400 focus:bg-blue-600 border px-2 h-10 rounded cursor-pointer whitespace-nowrap"
            >
              <i className="fa-solid fa-cart-shopping mr-2" />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
