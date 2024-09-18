import React, { useContext } from 'react';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import { ProductProvider } from '../providers/ProductContext';

export default function ListCart() {
  const { listCart } = useContext(ProductProvider); // Sử dụng ProductContext
  return (
    <>
      <div className="fixed right-1 top-16 cart-animation">
        <div className="bg-black w-[470px] text-white rounded px-5 py-4 m-w-[100%]">
          <h3 className=" font-semibold text-2xl mb-2">Cart</h3>
          <hr />
          <ul className="flex flex-col gap-4 mt-3 pr-5 min-h-[300px] max-h-[350px] overflow-auto">
            {/* Kiểm tra có tồn tại trong giỏ hàng kh */}
            {listCart.length > 0 ? (
              listCart.map((cart) => <CartItem key={cart.product.id} cart={cart} />)
            ) : (
              <div className="text-center min-h-[300px] max-h-[350px] mx-12 text-[16px] font-semibold">
                Chưa có sản phẩm trong giỏ hàng
              </div>
            )}
          </ul>
          <hr className="mt-5" />

          <CartFooter />
        </div>
      </div>
    </>
  );
}
