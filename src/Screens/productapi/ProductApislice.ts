// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { Product } from '../productdataapi/type';

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await fetch('https://fakestoreapi.com/products');
//   return await response.json();
// });

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     items: [] as Product[],
//     loading: false,
//     error: null as string | null,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchProducts.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to fetch';
//       });
//   },
// });

// export default productSlice.reducer;


// src/redux/productSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState } from '../../Redux/store';
// import { Product } from '../productdataapi/type';


// // export interface Product {
// //   id: number;
// //   title: string;
// //   description: string;
// //   image: string;
// //   price: number;
// //   category : string;
// // }

// interface ProductState {
//   selectedProductId?: number;
//   items: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   selectedProductId: undefined,
//   items: [],
//   loading: false,
//   error: null,
// };

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await fetch('https://fakestoreapi.com/products');
//   if (!response.ok) throw new Error('Network response was not ok');
//   return await response.json();
// });

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setSelectedProductId: (state, action) => {
//       state.selectedProductId = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchProducts.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch';
//       });
//   },
// });

// export const { setSelectedProductId } = productSlice.actions;
// export const selectproductdata = (state: RootState) => state.products;
// export default productSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/store';
import { Product } from '../productdataapi/type';

interface ProductState {
  selectedProductId?: number;
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  selectedProductId: undefined,
  items: [],
  loading: false,
  error: null,
};

// ✅ Add Product[] generic to the thunk
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
    setSelectedProductId: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export const { setSelectedProductId } = productSlice.actions;
export const selectproductdata = (state: RootState) => state.products;
export default productSlice.reducer;

