import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import wrapper from '@/store';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export default App;
