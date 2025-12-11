import { productData } from '@/data';
import { IProduct } from '@/types/product-interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image';

// Define product type
interface Product {
  id: number | string;
  title: string;
  price: number;
  discount: number | string;
  productImg: StaticImageData;
  [key: string]: unknown;
}

// Define state type
interface ProductState {
  products: IProduct[];
  product: Product | null;
  priceFilter: number | null;
}

// Initial state with flat product array
const initialState: ProductState = {
  products: productData,
  product: null,
  priceFilter: null,
};

// Create the slice
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    single_product: (state, action: PayloadAction<number | string>) => {
      state.product = state.products.find(product => product.id === action.payload) || null;
    },
    specific_product: (state, action: PayloadAction<number | string>) => {
      state.product = state.products.find(product => product.id === action.payload) || null;
    },
    getSingleProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

// Export actions
export const { single_product, specific_product, getSingleProduct } = productSlice.actions;

// Export selectors
export const selectProducts = (state: { products: ProductState }) => state.products.products;
export const selectProduct = (state: { products: ProductState }) => state.products.product;

// Export reducer
export default productSlice.reducer;
