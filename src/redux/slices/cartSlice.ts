"use client";

import { CartProduct } from "@/types/product-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define the state type for the cart
interface CartState {
  cartProducts: CartProduct[];
}

// Initial state
const initialState: CartState = {
  cartProducts: [],
};

// Create the slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cart_product: (state, action: PayloadAction<CartProduct>) => {
      const productIndex = state.cartProducts.findIndex((item) => item.id === action.payload.id);
      if (productIndex >= 0) {
        const toastId = toast.loading("");
        state.cartProducts[productIndex].quantity += 1;
        toast.info("Increase Product Quantity", {
          id: toastId,
          duration: 1000,
        });
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        const toastId = toast.loading("");
        state.cartProducts.push(tempProduct);
        toast.success(`${action.payload.title} added to cart`, {
          id: toastId,
          duration: 1000,
        });
      }
    },

    decrease_quantity: (state, action: PayloadAction<{ id: number | string }>) => {
      const cartIndex = state.cartProducts.findIndex((item) => item.id === action.payload.id);
      if (state.cartProducts[cartIndex]?.quantity > 1) {
        const toastId = toast.loading("");
        state.cartProducts[cartIndex].quantity -= 1;
        toast.error("Decrease cart quantity", {
          id: toastId,
          duration: 1000,
        });
      }
    },

    remove_cart_product: (state, action: PayloadAction<{ id: number | string }>) => {
      const toastId = toast.loading("");
      state.cartProducts = state.cartProducts.filter((item) => item.id !== action.payload.id);
      toast.error("Removed from your cart", {
        id: toastId,
        duration: 1000,
      });
    },

    clear_cart: (state) => {
      const confirmMsg = window.confirm("Are you sure you want to delete all cart items?");
      if (confirmMsg) {
        state.cartProducts = [];
      }
    },
  },
});

// Export actions
export const { cart_product, remove_cart_product, decrease_quantity, clear_cart } =
  cartSlice.actions;

// Selector for cart products
export const cartProducts = (state: { cart: CartState }) => state.cart.cartProducts;

// Export reducer
export default cartSlice.reducer;
