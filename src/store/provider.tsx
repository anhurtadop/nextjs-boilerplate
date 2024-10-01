'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef(store);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
