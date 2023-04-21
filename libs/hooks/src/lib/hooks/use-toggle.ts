import { useCallback, useState } from 'react';

type UseToggle = [boolean, (value?: boolean) => void];

export const useToggle = (initialValue = false): UseToggle => {
  const [toggle, setToggle] = useState<boolean>(initialValue);

  const onToggle = useCallback(
    (value?: boolean) =>
      setToggle((prevState) => {
        if (typeof value === 'boolean') return value;

        return !prevState;
      }),
    []
  );

  return [toggle, onToggle];
};
