import './header.scss';
import ListCart from '../../components/ListCart';
import { useContext, useState } from 'react';
import { ProductProvider } from '../../providers/ProductContext';

export default function Header() {
  const { listCart } = useContext(ProductProvider);
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-orange-400 w-full px-10 py-4 flex items-center justify-between text-white">
        <ul className="flex  gap-4 cursor-pointer">
          <li className="whitespace-nowrap">Trang chủ</li>
          <li className="whitespace-nowrap">Danh sách sản phẩm</li>
        </ul>
        <ul>
          <li onClick={handleToggle} className="cursor-pointer">
            <i className="text-2xl fa-solid fa-cart-shopping relative">
              <span className="cart-count">{listCart.length}</span>
            </i>
          </li>
        </ul>
      </header>
      {/* List cart */}
      {isShow && <ListCart />}
    </>
  );
}
