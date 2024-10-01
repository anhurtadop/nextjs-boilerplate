import { configureStore } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper'; // Puedes eliminar esta línea si no la necesitas
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

type NoopStorageKey = 'local' | 'session';
const createNoopStorage = () => {
  return {
    getItem(_key: NoopStorageKey) {
      return Promise.resolve(null);
    },
    setItem(_key: NoopStorageKey, value: NoopStorageKey) {
      return Promise.resolve(value);
    },
    removeItem(_key: NoopStorageKey) {
      return Promise.resolve();
    },
  };
};

const reducer = (state: any, action: any): ReturnType<typeof reducers> => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
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
          immutableCheck: false,
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
          immutableCheck: false,
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

export const store = makeStore({ isServer: typeof window === 'undefined' });
type ConfigureStore = ReturnType<typeof makeStore>;
type StoreGetState = ConfigureStore['getState'];
export type RootState = ReturnType<StoreGetState>;
