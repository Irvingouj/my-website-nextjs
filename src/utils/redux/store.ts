import { blogSlice } from '@/utils/redux/blogSlice';
import { Action, Store, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { GetServerSideProps, } from 'next';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  blogs: blogSlice.reducer
});

const serverStore = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});

export const isServer = () => {
  return typeof window === 'undefined'
};

export const createStore = (preloadedState: {serverState:RootState}) => {
  if (isServer()) {
    return serverStore;
  }


  if (!preloadedState.serverState) {
    return configureStore({
      reducer: reducers,
      devTools: true,
      middleware: getDefaultMiddleware => getDefaultMiddleware()
    });
  }
  return configureStore({
    reducer: reducers,
    preloadedState: preloadedState.serverState,
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
  });
}


export const withStore = (callback: (store: Store) => Promise<void>)
  : GetServerSideProps<{ serverState: RootState }> =>
  async (_) => {
    await callback(serverStore);
    return {
      props: {
        serverState: serverStore.getState()
      }
    };
  };


type AppStore = typeof serverStore;
export type RootState = ReturnType<typeof serverStore.getState>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>()