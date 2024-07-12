import React, { useEffect, useState } from "react";
import Logo from "../../image/CompanyLogo.png";
import { MdSupportAgent } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Header.css";


const Header: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    // Initialize cart count from localStorage on component mount
    const existingCartItems: any[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCartItemCount(existingCartItems.length);
  }, []);

  return (
    <div className="header-container">
      {/* Logo, support and Profile */}
      <div className="header-top">
        <div>
          <img src={Logo} alt="Company Logo" className="header-logo" />
        </div>
        <div className="header-icons-container">
          <div className="header-icon">
            <MdSupportAgent className="header-icon-image" />
            <span className="header-icon-text">Support</span>
          </div>
          <div className="header-icon">
            <CgProfile className="header-icon-image" />
            <span className="header-icon-text">Account</span>
          </div>
        </div>
      </div>
      {/* Navbar and Search */}
      <div className="navbar-inaline">
        <div>
          {/* <Navbar /> */}
        </div>
        <div className="searchbar-cart">
          <div className="header-bottom">
            <div className="header-search">
              <div className="header-search-input">
                <input
                  type="text"
                  className="header-input"
                  placeholder="Search..."
                />
                <IoIosSearch className="header-search-icon" />
              </div>
            </div>
            <div className="header-actions">
              {/* <div className="header-action">
                <FaRegHeart className="header-action-icon" />
                <span className="header-action-text">Add To Wishlist</span>
              </div> */}
              <Link to="/cart" className="header-action header-action-cart">
                <div className="header-action-icon-container">
                  <IoCartOutline className="header-action-icon" />
                  <span id="cart-count" className="header-action-cart-count">
                    {cartItemCount}
                  </span>
                </div>
                {/* <span className="header-action-text">Cart</span> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
