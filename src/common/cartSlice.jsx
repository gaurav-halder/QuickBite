import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({                 // Takes a config
    name: 'cart',                               // Name of cart slice
    initialState: {                             // Itital value of store
        items: []
    },
    reducers: {                                 // reducer function to add modify // mutating the state
        addItem: (state, action)=> {            // add item
            state.items.push(action.payload);
        },
        removeItem: (state)=> {                 // remove item
            state.items.pop();
        },
        clearCart: (state)=> {                  // clear cart
            state.items.length = 0;             // 0 = [] empty array
        },
    },
});
export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;