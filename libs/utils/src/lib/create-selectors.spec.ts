import { create } from 'zustand';
import { renderHook } from '@testing-library/react';

import { createSelectors } from './create-selectors';

interface DummyState {
  a: string;
  b: number;
  c: boolean;
}

const initialDummyState: DummyState = { a: 'a', b: 1, c: true };

const useBaseDummyStore = create<DummyState>(() => initialDummyState);

describe('createSelectors', () => {
  it('should return correct selectors', () => {
    const useDummyStore = createSelectors(useBaseDummyStore);

    const { result } = renderHook(() => ({
      a: useDummyStore.use.a(),
      b: useDummyStore.use.b(),
      c: useDummyStore.use.c(),
    }));

    expect(result.current.a).toEqual('a');
    expect(result.current.b).toEqual(1);
    expect(result.current.c).toEqual(true);
  });
});
