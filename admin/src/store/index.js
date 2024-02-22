import { configureStore } from '@reduxjs/toolkit';
import { users } from './reducers/users';

const root = {
  users,
};

export const store = configureStore({ reducer: root });
