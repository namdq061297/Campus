import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState } from '.';

const userSlice = createSlice({
  name: 'user',
  initialState: { username: '', token: '', isLoggedIn: false },
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      AsyncStorage.setItem('session', JSON.stringify(action.payload));
    },
    logout(state) {
      state.username = '';
      state.token = '';
      state.isLoggedIn = false;
      AsyncStorage.removeItem('session');
    },
    setSession(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout, setSession } = userSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export const setSessionFromStorage = () => async function (dispatch: AppDispatch) {
    const json = await AsyncStorage.getItem('session');
    if (json) {
        dispatch(setSession(JSON.parse(json)));
    }
};
export default userSlice.reducer;
