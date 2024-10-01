'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';

// persistStore(store);

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef(store);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
