import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserSlice {
  isLoggedIn: boolean;
  data: any;
}

// Define the initial state using that type
const initialState: UserSlice = {
  isLoggedIn: false,
  data: null
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLogin: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.data = action.payload;
      // window.localStorage.setItem("user", JSON.stringify(state));
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.data = null;
      // localStorage.clear();
    },
   //  getUser: (state) => {
   //    const getItem = window.localStorage.getItem("user");
   //    if (getItem) {
   //      const user = JSON.parse(getItem);
   //      state.isLoggedIn = user.isLoggedIn;
   //      state.email = user.email;
   //      state.password = user.password;
   //      console.log("User : ", user);
   //    }
   //  },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
