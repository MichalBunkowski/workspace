import { zodResolver } from '@hookform/resolvers/zod';
import { FC, KeyboardEventHandler, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/router';
import { findInputElementAndFocus } from '@workspace/utils';

import { SingleWordInput } from '../inputs/single-word-input/SingleWordInput';
import {
  SingleLetterInput,
  SingleLetterInputProps,
} from '../inputs/single-word-input/single-letter/SingleLetterInput';
import { useWordleStore } from '../../store/wordle';

const formDef: Array<
  Pick<SingleLetterInputProps, 'name' | 'nextName' | 'prevName'>
> = [
  { name: '1st', nextName: '2nd' },
  { name: '2nd', nextName: '3rd', prevName: '1st' },
  { name: '3rd', nextName: '4th', prevName: '2nd' },
  { name: '4th', nextName: '5th', prevName: '3rd' },
  { name: '5th', prevName: '4th' },
];

const SingleWordFormSchema = z.object({
  word: z.string().min(5),
});

type SingleWordFormValue = z.infer<typeof SingleWordFormSchema>;

export interface SingleWordFormProps {
  id: string;
  index: number;
  nextId?: string;
}

export const SingleWordForm: FC<SingleWordFormProps> = ({
  id,
  index: formIndex,
  nextId,
}) => {
  const router = useRouter();

  const form = useForm<SingleWordFormValue>({
    defaultValues: { word: '' },
    resolver: zodResolver(SingleWordFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { amountOfTries, drawnWord, isWinner, check } = useWordleStore();

  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  const checkIfWordIsCorrect = useCallback(
    ({ word }: SingleWordFormValue) => {
      const isGameOver = check(word);

      if (isGameOver) {
        router.replace('/score');
      }
    },
    [router, check]
  );

  const handleLastLetterEnterKey = useCallback<
    (index: number) => KeyboardEventHandler
  >(
    (index) => (e) => {
      if (e.key === 'Enter' && formDef.length === index + 1) {
        e.preventDefault();
        handleSubmit(checkIfWordIsCorrect)();
      }
    },
    [checkIfWordIsCorrect, handleSubmit]
  );

  useEffect(() => {
    const isNextFormEnabled = amountOfTries === formIndex + 1;

    if (isNextFormEnabled) {
      findInputElementAndFocus(`#${nextId}  input[name="1st${nextId}"]`, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountOfTries]);

  return (
    <form
      id={id}
      autoComplete="off"
      onSubmit={handleSubmit(checkIfWordIsCorrect)}
    >
      <Controller
        name="word"
        control={form.control}
        render={({ field, fieldState }) => (
          <SingleWordInput
            name={field.name}
            onChange={field.onChange}
            isTouched={fieldState.isTouched}
          >
            {formDef.map((fieldDef, index) => (
              <SingleLetterInput
                key={fieldDef.name}
                name={fieldDef.name.concat(id)}
                index={index}
                nextName={fieldDef.nextName && fieldDef.nextName.concat(id)}
                prevName={fieldDef.prevName && fieldDef.prevName.concat(id)}
                isLetterCorrect={drawnWord.includes(field.value.charAt(index))}
                isLetterAtCorrectPosition={
                  drawnWord.charAt(index) === field.value.charAt(index)
                }
                isDisabled={isWinner || amountOfTries !== formIndex}
                isRevealed={isSubmitSuccessful}
                onBlur={field.onBlur}
                onKeyPress={handleLastLetterEnterKey(index)}
              />
            ))}
          </SingleWordInput>
        )}
      />
      <button type="submit" style={{ visibility: 'hidden' }} hidden />
    </form>
  );
};
