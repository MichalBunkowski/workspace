import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useWordle } from '../../context/WordleContext';
import {
  SingleLetterInput,
  SingleLetterInputProps,
} from '../inputs/single-word-input/single-letter/SingleLetterInput';
import { SingleWordInput } from '../inputs/single-word-input/SingleWordInput';

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
  word: z.string().min(1).max(5),
});

type SingleWordFormValue = z.infer<typeof SingleWordFormSchema>;

export interface SingleWordFormProps {
  id: string;
  nextId?: string;
}

export const SingleWordForm: FC<SingleWordFormProps> = ({ id, nextId }) => {
  const form = useForm<SingleWordFormValue>({
    defaultValues: { word: '' },
    resolver: zodResolver(SingleWordFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { drawnWord, isWinner, verifyUserInput } = useWordle();

  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  const checkIfWordIsCorrect = useCallback(
    ({ word }: SingleWordFormValue) => {
      const isValid = verifyUserInput(word);

      if (!isValid) {
        const nextFormFirstInput = document.querySelector<HTMLInputElement>(
          `#${nextId}  input[name="1st${nextId}"]`
        );

        console.log(nextFormFirstInput);

        if (nextFormFirstInput) {
          nextFormFirstInput.focus();
          nextFormFirstInput.select();
        }
      }
    },
    [nextId, verifyUserInput]
  );

  return (
    <form id={id} onSubmit={handleSubmit(checkIfWordIsCorrect)}>
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
                isDisabled={isWinner}
                isRevealed={isSubmitSuccessful}
                onBlur={field.onBlur}
              />
            ))}
          </SingleWordInput>
        )}
      />
      <input type="submit" hidden />
    </form>
  );
};
