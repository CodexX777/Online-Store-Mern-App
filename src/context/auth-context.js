import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isSeller: false,
  token: null,
  login: () => {},
  changeAddress: () => {},
  sellerLogin: () => {},
  sellerLogout: () => {},
  logout: () => {},
  cart: [],
  address: null,
  uid: null,
});
