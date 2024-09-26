import { configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const reducer = (state: any, action: any): ReturnType<typeof reducers> => {
  // let reconcileState = {};

  // if (action.type == '__NEXT_REDUX_WRAPPER_HYDRATE__') reconcileState = reconcile(state, action.payload);
  if (action.type === HYDRATE) return { ...state, ...action.payload /*, ...reconcileState*/ };

  return reducers(state, action);
};
const makeStore = ({ isServer }: any) => {
  if (isServer) {
    return configureStore({
      reducer,
      middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
          thunk: false,
          serializableCheck: false,
          inmutableCheck: false,
        });
      },
    });
  } else {
    const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
    const persistConfig = {
      key: 'grandma-nextjs',
      whitelist: ['counter'],
      blacklist: [],
      storage,
    };
    const sagaMiddleware = createSagaMiddleware();

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: false,
          serializableCheck: false,
          inmutableCheck: false,
        }).concat(sagaMiddleware),
      devTools: process.env.NODE_ENV !== 'production',
    });

    // @ts-ignore -- adding an extra field for persistor
    store.__persistor = persistStore(store);
    // @ts-ignore -- adding an extra field for saga
    store['sagaTask'] = sagaMiddleware.run(sagas);

    return store;
  }
};

const wrapper = createWrapper(makeStore, { debug: false });
type ConfigureStore = ReturnType<typeof makeStore>;
type StoreGetState = ConfigureStore['getState'];
export type RootState = ReturnType<StoreGetState>;

export default wrapper;
