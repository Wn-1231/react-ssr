import { configureStore } from '@reduxjs/toolkit';
import counter from './counter';
import user from './user';

export const getServerStore = () => {
  return configureStore({
    reducer: {
      counter,
      user,
    },
  });
};

const config = {
  reducer: {
    counter,
    user,
  },
};

if (typeof window !== 'undefined' && window.INITIAL_STATE) {
  config.preloadedState = window.INITIAL_STATE;
}

export default configureStore(config);




