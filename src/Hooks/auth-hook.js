import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  let cart = [];
  const [address, setAddress] = useState("");

  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const [uid, setUid] = useState(null);

  const login = useCallback((id, addr, token, expirationDate) => {
    setIsSeller(null);
    setUid(id);
    setAddress(addr);
    setIsLoggedIn(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: token,
        address: addr,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const changeAddress = (newaddr) => {
    setAddress(newaddr);
  };

  const logout = useCallback(() => {
    setUid(null);
    setIsLoggedIn(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);
  const [isSeller, setIsSeller] = useState(null);
  const sellerLogin = useCallback((uid, token, expirationDate) => {
    setIsLoggedIn(null);
    setUid(uid);
    setIsSeller(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        isSeller: true,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const sellerLogout = useCallback(() => {
    setUid(null);
    setIsSeller(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (isSeller && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(sellerLogout, remainingTime);
    } else if (isLoggedIn && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [isSeller, isLoggedIn, logout, sellerLogout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      if (storedData.isSeller) {
        sellerLogin(
          storedData.userId,
          storedData.token,
          new Date(storedData.expiration)
        );
      } else {
        login(
          storedData.userId,
          storedData.address,
          storedData.token,
          new Date(storedData.expiration)
        );
      }
    }
  }, [login, sellerLogin]);

  return {
    cart,
    address,
    uid,
    login,
    logout,
    sellerLogin,
    sellerLogout,
    isLoggedIn,
    isSeller,
    changeAddress,
  };
};
