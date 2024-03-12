import { configureStore } from '@reduxjs/toolkit';
import { users } from './reducers/users';
import { homeInfo } from './reducers/homeInfo';

const root = {
  users,
  homeInfo
};

export const store = configureStore({ reducer: root });
