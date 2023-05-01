import { useTheme } from '@mui/material';
import { FC, FocusEventHandler, KeyboardEventHandler, useMemo } from 'react';
import { AnimatedTextField } from '@workspace/components/animated';
import { useFocusHandler } from '@workspace/hooks';

import { useSingleWord } from '../SingleWordContext';

export interface SingleLetterInputProps {
  name: string;
  index: number;
  isRevealed: boolean;
  isDisabled?: boolean;
  onBlur: FocusEventHandler;
  onKeyPress?: KeyboardEventHandler;
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
  onKeyPress,
  prevName,
  nextName,
  isLetterCorrect,
  isLetterAtCorrectPosition,
}) => {
  const theme = useTheme();
  const { letters, updateLetterAtIndex } = useSingleWord();

  const value = letters[index] ?? '';

  const [isFocused, setFocused, handleFocusPreviousInput] = useFocusHandler({
    observe: value,
    isValid: value.length === 1,
    isEmpty: value.length === 0,
    previousInputName: prevName,
    nextInputName: nextName,
  });

  const colors = useMemo(() => {
    if (isLetterCorrect && !isLetterAtCorrectPosition) {
      return {
        border: theme.color.yellow,
        background: theme.color.yellowAlpha,
      };
    }

    if (isLetterCorrect && isLetterAtCorrectPosition) {
      return {
        border: theme.color.green,
        background: theme.color.greenAlpha,
      };
    }

    return {
      border: theme.color.red,
      background: theme.color.redAlpha,
    };
  }, [isLetterAtCorrectPosition, isLetterCorrect, theme]);

  return (
    <AnimatedTextField
      inputProps={{ name, maxLength: 1 }}
      value={value ?? ''}
      disabled={isRevealed || isDisabled}
      onChange={(e) => {
        updateLetterAtIndex(index, e.target.value.toLowerCase());
      }}
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur(e);
      }}
      onKeyPress={onKeyPress}
      onKeyDown={handleFocusPreviousInput}
      sx={{
        '& input': {
          textAlign: 'center',
        },
        width: theme.spacing(7),
        height: theme.spacing(7),
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            transition: 'border-color 1s, background 1s',

            ...(isRevealed && colors
              ? {
                  borderColor: colors.border,
                  background: colors.background,
                }
              : {}),
          },
        },
      }}
      animate={isFocused && !isRevealed ? 'focused' : 'blurred'}
      variants={{
        focused: {
          scale: 1.2,
        },
        blurred: {
          scale: 1,
        },
      }}
    />
  );
};
