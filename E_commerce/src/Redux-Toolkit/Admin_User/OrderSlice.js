import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addcart: [
    
  ],
  order: [

  ]
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // _______________________________________________________
    // Add To Cart Product  / update product quntity
    // _______________________________________________________
    addcart: (state, action) => {
      const { userId, productId, quntity} = action.payload;
      const existingItem = state.addcart.find(
        (item) => item.userId === userId && item.productId === productId
      );
      if (existingItem) {
        existingItem.quntity += quntity;
      } else {
        state.addcart.push(action.payload);
      }
    },
    // _______________________________________________________
    // Remove Add To Cart 
    // _______________________________________________________
    removeItem: (state, action) => {
      const { userId, productId } = action.payload;
      state.addcart = state.addcart.filter(
        (item) => !(item.userId === userId && item.productId === productId)
      );
    },
    // _______________________________________________________
    // Order User 
    // _______________________________________________________
    orderUser: (state, action) => {
      const { userId, orders,order_id ,time, states   } = action.payload;
        state.order.push({ order_id,userId, orders,time,states });
        state.addcart = []
      console.log("thius is data", JSON.stringify(state.order, null, 2));
    },  
   // _______________________________________________________
    // Confirm Order 
    // _______________________________________________________
    confirmOrder: (state, action) => {
      const orderId = action.payload;
      const orderToConfirm = state.order.find(order => order.order_id === orderId);
  
      if (orderToConfirm) {
          orderToConfirm.states = 'Confirmed'; // or any other status
          console.log(`Order ${orderId} confirmed.`);
      } else {
          console.log(`Order ${orderId} not found.`);
      }
  }
  }
});

export const { addcart, removeItem, orderUser,confirmOrder } = orderSlice.actions;
export default orderSlice.reducer;

