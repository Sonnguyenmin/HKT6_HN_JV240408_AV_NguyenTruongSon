import React, { useState } from 'react';
import ProductJson from '../db.json';
import { saveData } from '../utils/common';
import { Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//Tạo ngữ cảnh
export const ProductProvider = React.createContext();

export default function ProductContext({ children }) {
  //#region State khởi tạo trạng thái cart
  const [listProduct, setListProduct] = useState(() => {
    return ProductJson;
  });

  // Khởi tạo state để lưu giỏ hàng từ localStorage
  const [listCart, setListCart] = useState(() => {
    const cartLocal = JSON.parse(localStorage.getItem('carts')) || [];
    return cartLocal;
  });

  const { confirm } = Modal;
  //#endregion

  /**
   * Hàm thêm sản phẩm vào giỏ hàng
   * @param {*} product Đối tượng product
   * Auth: NTSon (18/09/2024)
   */
  const handleAddToCart = (product) => {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const findProductByCarts = listCart.find((item) => item.product.id === product.id);

    if (!findProductByCarts) {
      // Nếu chưa thì thêm vào kèm theo quantity = 1
      const updateCarts = [...listCart, { product, quantity: 1 }];

      setListCart(updateCarts);
      saveData('carts', updateCarts);
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1
      const updateCarts = listCart.map((cart) => {
        if (cart.product.id === product.id) {
          return { ...cart, quantity: (cart.quantity += 1) };
        }

        return cart;
      });

      setListCart(updateCarts);
      saveData('carts', updateCarts);
    }
  };

  /**
   * Tăng số lượng sản phẩm trong giỏ hàng.
   * @param {*} cart - Đối tượng sản phẩm cần tăng số lượng.
   * Auth:NTSon (18/09/2024)
   */
  const handleIncrease = (cart) => {
    const findCartByCarts = listCart.find((item) => item.product.id === cart.product.id);
    if (!findCartByCarts) {
      // Nếu sản phẩm không tồn tại trong giỏ hàng, không làm gì
      return;
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1
      const updateCarts = listCart.map((cartItem) => {
        if (cartItem.product.id === cart.product.id) {
          return { ...cartItem, quantity: (cartItem.quantity += 1) };
        }

        return cartItem;
      });

      setListCart(updateCarts);
      saveData('carts', updateCarts);
    }
    // console.log("increase",cart.quantity);
  };

  /**
   *Giảm số lượng sản phẩm trong giỏ hàng.
   * @param {*} cart - Đối tượng sản phẩm cần giảm số lượng.
   * Auth: NTSon (18/09/2024)
   */
  const handleDecrease = (cart) => {
    const findCartByCarts = listCart.find((item) => item.product.id === cart.product.id);

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    if (!findCartByCarts) {
      return;
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1
      if (findCartByCarts.quantity === 1) {
        const updateCarts = listCart.filter((cartItem) => cartItem.product !== findCartByCarts.product);
        setListCart(updateCarts);
        saveData('carts', updateCarts);
      } else {
        const updateCarts = listCart.map((cartItem) => {
          if (cartItem.product.id === cart.product.id) {
            return { ...cartItem, quantity: (cartItem.quantity -= 1) };
          }

          return cartItem;
        });

        setListCart(updateCarts);
        saveData('carts', updateCarts);
      }
    }
  };

  /**
   * Xóa sản phẩm khỏi giỏ hàng.
   * @param {*} cart - Đối tượng sản phẩm cần xóa khỏi giỏ hàng.
   * Auth: NTSon (18/09/2024)
   */
  const handleDelete = (cart) => {
    confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk: () => {
        const findCartByCarts = listCart.find((item) => item.product.id === cart.product.id);
        if (!findCartByCarts) {
          return;
        } else {
          const updateCarts = listCart.filter((cartItem) => cartItem.product.id !== findCartByCarts.product.id);
          setListCart(updateCarts);
          saveData('carts', updateCarts);

          notification.success({
            message: 'Xóa sản phẩm thành công',
            description: 'Sản phẩm đã được xóa khỏi giỏ hàng.',
            placement: 'topRight',
          });
          setTimeout(() => {
            notification.destroy();
          }, 2000);
        }
      },
      onCancel: () => {
        notification.error({
          message: 'Xóa sản phẩm không thành công',
          placement: 'topRight',
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      },
    });
  };

  return (
    <ProductProvider.Provider
      value={{ listProduct, handleAddToCart, listCart, handleIncrease, handleDecrease, handleDelete }}
    >
      {children}
    </ProductProvider.Provider>
  );
}
