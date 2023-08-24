import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

const products = [
  { id: 1, name: 'ขนมปังสูตรครีม', price: 20, image: 'https://cdn.discordapp.com/attachments/1079953929359589386/1142851545935908945/pngegg_1.png' },
  { id: 2, name: 'ขนมปังสาหร่าย', price: 25, image: 'https://cdn.discordapp.com/attachments/1079953929359589386/1142851546334371870/pngegg.png' },
  { id: 3, name: 'ขนมปังรสช็อคโกแลต', price: 30, image: 'URL ของรูปภาพสินค้า' },
  { id: 4, name: 'ขนมปังรสวานิลลา', price: 22, image: 'URL ของรูปภาพสินค้า' },
  { id: 5, name: 'ขนมปังรสสตรอเบอร์รี่', price: 28, image: 'URL ของรูปภาพสินค้า' },
  { id: 6, name: 'ขนมปังรสเครมบรูเล่', price: 35, image: 'URL ของรูปภาพสินค้า' },
  { id: 7, name: 'ขนมปังรสไส้กรอก', price: 40, image: 'URL ของรูปภาพสินค้า' },
  { id: 8, name: 'ขนมปังรสเฟรนช์ทัสต์', price: 32, image: 'URL ของรูปภาพสินค้า' },
  { id: 9, name: 'ขนมปังรสเบเกอรี่', price: 26, image: 'URL ของรูปภาพสินค้า' },
  { id: 10, name: 'ขนมปังรสกาแฟ', price: 30, image: 'URL ของรูปภาพสินค้า' },
  { id: 11, name: 'ขนมปังรสวาฟเฟิล', price: 25, image: 'URL ของรูปภาพสินค้า' },
  { id: 12, name: 'ขนมปังรสมอคค่า', price: 28, image: 'URL ของรูปภาพสินค้า' },
  { id: 13, name: 'ขนมปังรสเลมอน', price: 22, image: 'URL ของรูปภาพสินค้า' },
  { id: 14, name: 'ขนมปังรสพาสช่อง', price: 35, image: 'URL ของรูปภาพสินค้า' },
  { id: 15, name: 'ขนมปังรสสตรอว์เบอร์รี', price: 40, image: 'URL ของรูปภาพสินค้า' },
  { id: 16, name: 'ขนมปังรสคาราเมล', price: 32, image: 'URL ของรูปภาพสินค้า' },
  { id: 17, name: 'ขนมปังรสไส้กรอกฮอทดอก', price: 26, image: 'URL ของรูปภาพสินค้า' },
  { id: 18, name: 'ขนมปังรสชีสเค้ก', price: 30, image: 'URL ของรูปภาพสินค้า' },
  { id: 19, name: 'ขนมปังรสแซลมอน', price: 25, image: 'URL ของรูปภาพสินค้า' },
  { id: 20, name: 'ขนมปังรสคุกกี้น้ำแตงโม', price: 28, image: 'URL ของรูปภาพสินค้า' },
  { id: 21, name: 'ขนมปังรสวานิลลาไข่มุก', price: 22, image: 'URL ของรูปภาพสินค้า' },
];



const Shop = () => {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisibility] = useState(false);

  const addToCart = (product) => {
    const existingCartItem = cart.find(item => item.id === product.id);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
      setCart([...cart]);
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCart([...cart, newCartItem]);
    }
    
    Swal.fire('เพิ่มสินค้าลงตะกร้าแล้ว', `${product.name} ถูกเพิ่มลงในตะกร้าแล้ว`, 'success');
  };

  const toggleCartVisibility = () => {
    setCartVisibility(!isCartVisible);
  };

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Navbar
        cart={cart}
        showCart={toggleCartVisibility}
        isCartVisible={isCartVisible}
        toggleCartVisibility={toggleCartVisibility}
        totalPrice={calculateTotalPrice(cart)}
        setCart={setCart} // ส่ง setCart เข้าไป
      />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">สินค้าในร้าน</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {products.map((product) => (
    <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-2">{product.name}</h2>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
        <p className="text-gray-600">ราคา: {product.price} บาท</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
          onClick={() => addToCart(product)}
        >
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default Shop;
