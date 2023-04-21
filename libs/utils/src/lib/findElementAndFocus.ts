export const findInputElementAndFocus = (
  selector: string,
  shouldSelect?: boolean
) => {
  const el = document.querySelector<HTMLInputElement>(selector);

  if (el) {
    el.focus();

    if (shouldSelect) {
      el.select();
    }
  }
};
