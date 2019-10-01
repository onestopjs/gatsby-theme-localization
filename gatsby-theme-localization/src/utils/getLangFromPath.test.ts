import getLangFromPath from "./getLangFromPath";

describe('get only language part from path', () => {
  test('2-character language', () => {
    const pathname = '/en/test-path';
    expect(getLangFromPath(pathname)).toEqual('en');
  })
  test('5-character language', () => {
    const pathname = '/en-US/test-path';
    expect(getLangFromPath(pathname)).toEqual('en-US');
  })
  test('no path', () => {
    const pathname = '/en';
    expect(getLangFromPath(pathname)).toEqual('en');
  })
  test('multiple levels', () => {
    const pathname = '/en/one-level/two-level';
    expect(getLangFromPath(pathname)).toEqual('en');
  })
})