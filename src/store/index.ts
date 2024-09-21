// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Usamos el almacenamiento local por defecto
// import { createWrapper } from 'next-redux-wrapper';
// import reducers from './reducers'; // Aquí defines tus reducers combinados
// import sagas from './sagas'; // Aquí defines tus sagas

// // Configuración del Persist
// const persistConfig = {
//   key: 'root',
//   storage, // Utiliza localStorage para la persistencia
//   whitelist: ['counter'], // Reducers que quieres persistir
//   blacklist: [''], // Reducers que no quieres persistir
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// // Crear middleware de Saga
// const sagaMiddleware = createSagaMiddleware();

// const makeStore = () => {
//   const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         thunk: false, // Desactivamos Thunks si usamos Sagas
//         serializableCheck: false, // Evita problemas con objetos no serializables
//       }).concat(sagaMiddleware),
//     devTools: process.env.NODE_ENV !== 'production', // Activar Redux DevTools en desarrollo
//   });

//   store.__persistor = persistStore(store);
//     store['sagaTask'] = sagaMiddleware.run(sagas);

//   return store;
// };

// // Configuramos el wrapper de Next.js
// const wrapper = createWrapper(makeStore, { debug: false });

// export { wrapper };

import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import reducers from './reducers';
import sagas from './sagas';
// import reconcile from './reconcile';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, getStoredState, REHYDRATE } from 'redux-persist';

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
  if (action.type === HYDRATE) return { ...state, ...action.payload/*, ...reconcileState*/ };

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

    // @ts-ignore -- special stuff
    store.__persistor = persistStore(store);
    // @ts-ignore -- special stuff
    store['sagaTask'] = sagaMiddleware.run(sagas);


    return store;
  }
};

const wrapper = createWrapper(makeStore, { debug: false });
type ConfigureStore = ReturnType<typeof makeStore>;
type StoreGetState = ConfigureStore['getState'];
export type RootState = ReturnType<StoreGetState>;

export default wrapper;

