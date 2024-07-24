import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
};

export const userSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: any) => {
      state.todoList = [...state.todoList, action.payload];
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
