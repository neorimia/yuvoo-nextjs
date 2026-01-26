"use client";

import { CartProduct } from "@/types/product-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RootState } from "../store";

interface WishlistState {
  wishlist: CartProduct[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    add_to_wishlist: (state, action: PayloadAction<CartProduct>) => {
      const productIndex = state.wishlist.findIndex((item) => item.id === action.payload.id);
      const toastId = toast.loading("");
      if (productIndex >= 0) {
        toast.error(`${action.payload.title} already added to wishlist`, {
          id: toastId,
          duration: 1000,
        });
      } else {
        state.wishlist.push(action.payload);
        toast.success(`${action.payload.title} added to wishlist`, {
          id: toastId,
          duration: 1000,
        });
      }
    },
    remove_wishlist_product: (state, action: PayloadAction<{ id: number | string }>) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
      const toastId = toast.loading("");
      toast.error("Removed from your wishlist", {
        id: toastId,
        duration: 1000,
      });
    },
  },
});

export const { add_to_wishlist, remove_wishlist_product } = wishlistSlice.actions;

// ✅ Proper selector using RootState
export const wishlistItems = (state: RootState) => state.wishlist.wishlist;

export default wishlistSlice.reducer;
