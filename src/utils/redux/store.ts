import logger from '@/lib/logger';
import { blogSlice } from '@/utils/redux/blogSlice';
import { profileSlice } from '@/utils/redux/profileSlice';
import {
  Action,
  Store,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {} from 'redux-thunk/extend-redux';

//https://github.com/reduxjs/redux-thunk/issues/333

const reducers = combineReducers({
  blogs: blogSlice.reducer,
  profile: profileSlice.reducer,
});

const serverStore = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const isServer = () => {
  return typeof window === 'undefined';
};

export const createStore = (preloadedState: RootState) => {
  if (isServer()) {
    return serverStore;
  }

  if (!preloadedState) {
    logger('preloadedState.serverState is undefined');
    return configureStore({
      reducer: reducers,
      devTools: true,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  }
  return configureStore({
    reducer: reducers,
    preloadedState,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

type context = GetServerSidePropsContext;

export const withStore =
  <T extends object>(
    callback: (
      store: Store,
      ctx: context,
    ) => Promise<GetServerSidePropsResult<T> | void>,
  ): GetServerSideProps<{ serverState: RootState }> =>
  async (ctx) => {
    const res = await callback(serverStore, ctx);
    if (res !== undefined) {
      if ('props' in res) {
        // If res has a props property (which may be a Promise), then we append props to the result.
        const props = await Promise.resolve(res.props);
        return {
          props: {
            serverState: serverStore.getState(),
            ...props,
          },
        };
      } else if ('redirect' in res || 'notFound' in res) {
        // If res has a redirect or notFound property, just return res as is.
        return res;
      }
    }

    // If res is undefined or void, return the current state
    return {
      props: {
        serverState: serverStore.getState(),
      },
    };
  };

type AppStore = typeof serverStore;
export type RootState = ReturnType<typeof serverStore.getState>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
