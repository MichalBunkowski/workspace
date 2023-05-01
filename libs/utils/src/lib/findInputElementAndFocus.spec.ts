import { findInputElementAndFocus } from './findInputElementAndFocus';

describe('findInputElementAndFocus', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <input type="text" id="test-input" value="test" />
        `;
  });

  it('should focus element', () => {
    findInputElementAndFocus('#test-input');
    const input = document.getElementById('test-input');

    expect(document.activeElement).toEqual(input);
  });
});
