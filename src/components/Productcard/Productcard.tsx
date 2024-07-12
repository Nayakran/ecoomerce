import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { fetchProducts } from "../../services/productService";
import "./Productcard.css";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const Productcard: React.FC = () => {
  const [productcardData, setProductcardData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await fetchProducts();
      setProductcardData(products.map((product: any) =>({...product,quantity:1})));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingCartItems: Product[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const productIndex = existingCartItems.findIndex(
      (item) => item.id === product.id
    );
    if (productIndex !== -1) {
      existingCartItems[productIndex].quantity += 1;
    } else {
      existingCartItems.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existingCartItems));

    // Update cart count in header
    updateCartCount(existingCartItems.length);

    alert("Product Saved Successfully");
  };

  const updateCartCount = (count: number) => {
    const cartCountSpan = document.getElementById("cart-count");
    if (cartCountSpan) {
      cartCountSpan.textContent = count.toString();
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div>Loading.......</div>
      ) : (
        productcardData.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.image}
              alt={product.title}
              height={300}
              width={300}
              className="card-img"
            />
            <div className="card-title">{product.title}</div>
            <div className="card-price">${product.price}</div>
            <div
              className="card-button-container"
              onClick={() => handleAddToCart(product)}
            >
              <div className="card-button">
                <IoCartOutline className="card-button-icon" />
                <button className="card-button-text">Add To Cart</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Productcard;
