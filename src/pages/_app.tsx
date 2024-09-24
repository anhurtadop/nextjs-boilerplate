import wrapper from '@/store';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'react-redux';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export default appWithTranslation(App);
