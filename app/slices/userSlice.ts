import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  token: string | null;
}

const initialState: User = {
  token: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
