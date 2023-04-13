import { TextField, useTheme } from '@mui/material';
import { FC, FocusEventHandler, useMemo } from 'react';

import { useFocusHandler } from '@workspace/hooks';

import { useSingleWord } from '../SingleWordContext';

export interface SingleLetterInputProps {
  name: string;
  index: number;
  isRevealed: boolean;
  isDisabled?: boolean;
  onBlur: FocusEventHandler;
  prevName?: string;
  nextName?: string;
  isLetterCorrect?: boolean;
  isLetterAtCorrectPosition?: boolean;
}
export const SingleLetterInput: FC<SingleLetterInputProps> = ({
  name,
  index,
  isRevealed,
  isDisabled,
  onBlur,
  prevName,
  nextName,
  isLetterCorrect,
  isLetterAtCorrectPosition,
}) => {
  const theme = useTheme();
  const { letters, updateLetterAtIndex } = useSingleWord();

  const value = letters[index] ?? '';

  const { setFocused, handleFocusPreviousInput } = useFocusHandler({
    observe: value,
    isValid: value.length === 1,
    isEmpty: value.length === 0,
    previousInputName: prevName,
    nextInputName: nextName,
  });

  const colors = useMemo(() => {
    if (isLetterCorrect && !isLetterAtCorrectPosition) {
      return {
        border: '#e6b80f',
        background: 'rgba(230,184,15,0.2)',
      };
    }

    if (isLetterCorrect && isLetterAtCorrectPosition) {
      return {
        border: '#3de60f',
        background: 'rgba(61,230,15,0.2)',
      };
    }

    return null;
  }, [isLetterAtCorrectPosition, isLetterCorrect]);

  return (
    <TextField
      inputProps={{ name, maxLength: 1 }}
      value={value ?? ''}
      disabled={isRevealed || isDisabled}
      onChange={(e) => {
        updateLetterAtIndex(index, e.target.value);
      }}
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur(e);
      }}
      onKeyDown={handleFocusPreviousInput}
      sx={{
        '& input': {
          textAlign: 'center',
        },
        width: theme.spacing(7),
        height: theme.spacing(7),
        ...(isRevealed && colors
          ? {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.border,
                  background: colors.background,
                },
              },
            }
          : {}),
      }}
    />
  );
};
