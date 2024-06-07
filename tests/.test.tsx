describe('A duck needs 2 wings', () => {
  it('Count duck wings', () => {
    expect('Duck'.length / 2).toBe(2);
  });
});

describe('JavaScript type coercion', () => {
  it('Adding empty string to a number', () => {
    expect(0 + '').toBe('0');
  });

  it('True is not exactly true in JavaScript', () => {
    expect(1 + '1').toBe('11');
  });

  it('Array plus object, classic JavaScript', () => {
    // @ts-ignore
    expect([] + {}).toBe('[object Object]');
  });

  it('Object plus array, still classic JavaScript', () => {
    // @ts-ignore
    expect({} + []).toBe('[object Object]');
  });

  it('Minus zero equals plus zero', () => {
    expect(-0 === +0).toBe(true);
  });
});
