"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem, CartProduct } from "@/types/product-interface";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);

  // Memoize cartItems to prevent recreation on every render
  const cartItems: CartItem[] = useMemo(() => {
    return cartProducts.map((item: CartProduct) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      productImg: item.productImg,
    }));
  }, [cartProducts]);

  useEffect(() => {
    const cart = cartItems.reduce(
      (cartTotal, cartItem) => {
        const itemTotal = cartItem.price * cartItem.quantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity += cartItem.quantity;
        return cartTotal;
      },
      { total: 0, quantity: 0 }
    );

    setQuantity(cart.quantity);
    setTotal(cart.total);
  }, [cartItems]); // Now only depends on memoized cartItems

  return { quantity, total };
};

export default useCartInfo;
