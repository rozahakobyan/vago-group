import { configureStore } from '@reduxjs/toolkit';
import { users } from './reducers/users';
import { homeInfo } from './reducers/homeInfo';
import { loginImage } from './reducers/loginImage';

const root = {
  users,
  homeInfo,
  loginImage
};

export const store = configureStore({ reducer: root });
