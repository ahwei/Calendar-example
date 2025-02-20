import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { JSX, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '@/store/store';
import { setupStore } from '@/store/store';

// As a basic setup, import your same slice reducers
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
