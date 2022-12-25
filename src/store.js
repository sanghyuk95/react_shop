import {configureStore, createSlice} from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    name: "choi",
    age: 20,
  },
  reducers: {
    change(state) {
      state.name = "park";
    },
    increase(state, a) {
      state.age += a.payload;
    },
  },
});

export let {change, increase} = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    {id: 0, name: "White and Black", count: 2},
    {id: 2, name: "Grey Yordan", count: 1},
  ],
  reducers: {
    incount(state, action) {
      state.forEach((e) => {
        if (action.payload.id === e.id) {
          e.count++;
        }
      });
    },
    addItem(state, action) {
      state.push({ id: action.payload.id, name: action.payload.title, count: 1 });
    },
  },
});

export let {incount, addItem} = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
