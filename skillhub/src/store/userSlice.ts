import { ILogin } from "@/interfaces/user";
import { loginService } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";


interface IUser {
  id: unknown | null,
  name: string,
  email: string;
  points: number
}

interface UserState {
  user: IUser;
  status: 'pending' | 'fulfilled' |'rejected';
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: {
    id: null,
    name: '',
    email: '',  
    points: 0  
  },
  status: 'fulfilled',
  isAuthenticated: false
};

export const loginUser = createAsyncThunk('user/login', async (params: ILogin) => {
  const response = await loginService(params);
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.email = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.isAuthenticated = true;
      state.user = action.payload.user;
    })
    .addCase(loginUser.rejected, (state) => {
      state.status = 'rejected';
      state.isAuthenticated = false;
    })
    }
});

export const selectIsLogin = (state: {user : UserState}) => state.user.isAuthenticated;
export const selectUserName = (state: {user : UserState}) => state.user.user.name;
export const selectUserEmail = (state: {user : UserState}) => state.user.user.email;
export const selectUserPoint = (state: {user : UserState}) => state.user.user.points;
export const selectUser = (state: RootState) => state.user;


export default userSlice.reducer;
