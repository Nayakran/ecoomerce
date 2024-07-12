import React, { useState, useEffect } from 'react';
import { IoClose, IoAdd, IoRemove } from 'react-icons/io5';
import './Cart.css';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch cart items from localStorage on component mount
    const existingCartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]').map((item: CartItem) => ({
      ...item,
      quantity: item.quantity || 1, 
    }));
    setCartItems(existingCartItems);
  }, []);
  // ADD To Cart
  // const addToCart =(newProduct:CartItem)=>{
  //   const existingCartItems =[...cartItems];
  //   const productIndex = existingCartItems.findIndex(item=>item.id ===newProduct.id);
    
  //   // if product already exist then increase quantity
  //   if(productIndex !== -1){
  //     existingCartItems[productIndex].quantity += newProduct.quantity;

  //   }else{
  //     existingCartItems.push(newProduct);
  //   }
  //   // set the items
  //   setCartItems(existingCartItems);
  //   localStorage.setItem('cart',JSON.stringify(existingCartItems));
  // }


  // 

  const removeFromCart = (productId: number) => {
    // Remove product from cart based on productId
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const incrementQuantity = (productId: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const decrementQuantity = (productId: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(item.quantity - 1, 0) };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with quantity 0
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity); 
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-grid">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-name">{item.title}</div>
            <div className="cart-item-price">${item.price.toFixed(2)}</div>
            <div className="cart-item-quantity">
              <button
                className="cart-quantity-btn"
                onClick={() => decrementQuantity(item.id)}
              >
                <IoRemove />
              </button>
              <span className="quantity-border">{item.quantity}</span>
              <button
                className="cart-quantity-btn"
                onClick={() => incrementQuantity(item.id)}
              >
                <IoAdd />
              </button>
            </div>
            <div className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
              <IoClose className="mr-1" /> Remove
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">Total: ${calculateTotal()}</div>
    </div>
  );
};

export default CartPage;
