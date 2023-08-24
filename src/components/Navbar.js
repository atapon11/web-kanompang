import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Navbar.css'; // เพิ่มไฟล์ CSS ที่ปรับแต่งเอง

const Navbar = ({ cart, isCartVisible, toggleCartVisibility, totalPrice, setCart }) => {
  const increaseQuantity = (item) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (item) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const handlePayment = () => {
    Swal.fire({
      title: 'ยืนยันการชำระเงิน',
      text: `ยอดรวมทั้งหมด: ${totalPrice} บาท`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'ชำระเงิน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]); // ลบสินค้าในตะกร้าหลังชำระเงิน
        Swal.fire('ชำระเงินเรียบร้อย', 'ขอบคุณที่ใช้บริการ!', 'success');
      }
    });
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const canScroll = cart.length > 5;

  return (
    <nav className={`bg-blue-500 p-4 text-white ${isSticky ? 'navbar-fixed' : ''}`}>
      <div className="container mx-auto flex justify-between items-center relative">
      <div className="logo-container">
  <div className="logo-circle">
    <img src="https://cdn.discordapp.com/attachments/1079953929359589386/1142875569256669267/image.png" alt="โลโก้ร้านขายขนมปัง" className="logo-image" />
  </div>
  <h1 className="text-lg font-semibold">ร้านขายขนมปัง</h1>
</div>
        <div className="relative">
          <button
            className="cart-button"
            onClick={toggleCartVisibility}
          >
            ตะกร้าสินค้า ({cart.length})
          </button>
          {cart.length > 0 && (
            <div className="cart-badge">
              {cart.length}
            </div>
          )}
          {isCartVisible && cart.length > 0 && (
            <div className={`cart-popup ${canScroll ? 'scrollable' : ''}`}>
              <button
                className="close-button"
                onClick={toggleCartVisibility}
              >
                <span>&times;</span>
              </button>
              <h2 className="popup-title">ตะกร้าสินค้า</h2>
              <ul className="popup-list">
                {cart.map((item, index) => (
                  <li key={index} className="popup-item">
                    <div className="item-details">
                      <div className="item-border">
                        <img src={item.image} alt={item.name} className="item-image" />
                      </div>
                      <div>
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">
                          {item.price} บาท x {item.quantity} ชิ้น
                          <div className="quantity-buttons">
                            <button className="increase-button" onClick={() => increaseQuantity(item)}>+</button>
                            <button className="decrease-button" onClick={() => decreaseQuantity(item)}>-</button>
                          </div>
                          <button className="remove-button" onClick={() => removeItem(item)}>ลบ</button>
                        </p>
                      </div>
                    </div>
                    <span className="item-total">{item.price * item.quantity} บาท</span>
                  </li>
                ))}
              </ul>
              <div className="total-price">
                <p className="total-text">ราคารวมทั้งหมด: {totalPrice} บาท</p>
              </div>
              <div className="pay-button-container">
                <button
                  className="pay-button-style"
                  onClick={() => handlePayment()}
                >
                  ชำระเงิน
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
