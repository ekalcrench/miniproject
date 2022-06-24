import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type CategorySlice = {
  type : string;
  gender: string;
}

// Define the initial state using that type
const initialState: CategorySlice = {
  type: "",
  gender: "",
};

export const categorySlice = createSlice({
  name: "category",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    clearAll: (state) => {
      state.type = "";
      state.gender = "";
    }
  },
});

export const { setType, setGender, clearAll } = categorySlice.actions;

export default categorySlice.reducer;
