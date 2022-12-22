import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && !auth.isSeller && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}

      {!auth.isSeller && (
        <li>
          <NavLink to="/sellerAuth">Become a seller</NavLink>
        </li>
      )}
      {(auth.isLoggedIn || auth.isSeller) && (
        <li>
          <div className="dropdown">
            <span>My Account</span>
            <div className="dropdown-content">
              {auth.isLoggedIn && !auth.isSeller && (
                <NavLink className="dropdown-menu-user-link" to="/myorder">
                  My Orders
                </NavLink>
              )}
              {auth.isLoggedIn && !auth.isSeller && (
                <NavLink className="dropdown-menu-user-link" to="/address">
                  Address
                </NavLink>
              )}
              {auth.isSeller && (
                <NavLink className="dropdown-menu-seller-link" to="/add">
                  Add Product
                </NavLink>
              )}
              {auth.isSeller && (
                <NavLink className="dropdown-menu-seller-link" to="/myprod">
                  My Products
                </NavLink>
              )}
              <button
                className="dropdown-menu-btn"
                onClick={() => {
                  auth.sellerLogout();
                  auth.logout();
                  navigate("/");
                }}
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </li>
      )}

      {!auth.isSeller && (
        <li>
          <NavLink to="/cart">
            <svg
              width="61"
              height="44"
              viewBox="0 0 61 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_11_128)">
                <path
                  d="M34.8482 13.4483C35.6868 11.4303 37.6653 10.1225 39.8505 10.1418L52.7241 10.2551C56.5305 10.2886 59.0927 14.1647 57.6319 17.6799L52.6915 29.5683C51.8529 31.5863 49.8744 32.8941 47.6892 32.8748L34.8156 32.7615C31.0092 32.728 28.4471 28.8519 29.9078 25.3367L34.8482 13.4483Z"
                  fill="#D9D9D9"
                />
                <circle cx="35.4147" cy="35.4146" r="2.14634" fill="#D9D9D9" />
                <path
                  d="M47.2196 35.4146C47.2196 36.6 46.2586 37.561 45.0732 37.561C43.8878 37.561 42.9269 36.6 42.9269 35.4146C42.9269 34.2292 43.8878 33.2683 45.0732 33.2683C46.2586 33.2683 47.2196 34.2292 47.2196 35.4146Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M28.9936 6.99529C29.392 6.55648 30.0707 6.52373 30.5095 6.92214L36.8658 12.6932C37.3046 13.0917 37.3374 13.7704 36.939 14.2092L35.4962 15.7983C35.0978 16.2371 34.4191 16.2698 33.9803 15.8714L27.624 10.1003C27.1851 9.70189 27.1524 9.02318 27.5508 8.58437L28.9936 6.99529Z"
                  fill="#D9D9D9"
                />
                <rect
                  x="22.5366"
                  y="6.52696"
                  width="8.04786"
                  height="4.09345"
                  rx="1.07317"
                  transform="rotate(-0.626074 22.5366 6.52696)"
                  fill="#D9D9D9"
                />
                <path
                  d="M37.561 16.0976C37.561 14.9122 38.522 13.9512 39.7074 13.9512H41.8537C43.0391 13.9512 44.0001 14.9122 44.0001 16.0976V17.1707C44.0001 18.3561 43.0391 19.3171 41.8537 19.3171H39.7074C38.522 19.3171 37.561 18.3561 37.561 17.1707V16.0976Z"
                  fill="#040000"
                />
                <rect
                  x="47.2196"
                  y="12.8781"
                  width="6.43902"
                  height="5.36585"
                  rx="2.14634"
                  fill="#040000"
                />
                <path
                  d="M44 23.6098C44 22.4244 44.9609 21.4634 46.1463 21.4634H48.2927C49.4781 21.4634 50.439 22.4244 50.439 23.6098V24.6829C50.439 25.8683 49.4781 26.8293 48.2927 26.8293H46.1463C44.9609 26.8293 44 25.8683 44 24.6829V23.6098Z"
                  fill="#040000"
                />
                <path
                  d="M33.2683 24.6829C33.2683 23.4975 34.2293 22.5366 35.4147 22.5366H37.561C38.7464 22.5366 39.7073 23.4975 39.7073 24.6829V25.7561C39.7073 26.9415 38.7464 27.9024 37.561 27.9024H35.4147C34.2293 27.9024 33.2683 26.9415 33.2683 25.7561V24.6829Z"
                  fill="#040000"
                />
              </g>
              <defs>
                <clipPath id="clip0_11_128">
                  <rect width="61" height="44" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
