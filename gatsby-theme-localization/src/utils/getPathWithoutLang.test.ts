import getPathWithoutLang from "./getPathWithoutLang";

describe('get the path without the language part', () => {
  test('2-character language', () => {
    const pathname = '/en/test-path';
    expect(getPathWithoutLang(pathname)).toEqual('/test-path')
  })
  test('3-character language', () => {
    const pathname = '/bgn/test-path';
    expect(getPathWithoutLang(pathname)).toEqual('/test-path')
  })
  test('preserve trailing slash', () => {
    const pathname = '/en/test-path/';
    expect(getPathWithoutLang(pathname)).toEqual('/test-path/')
  })
  test('multiple levels', () => {
    const pathname = '/en/test-path/mest-path/gest-path';
    expect(getPathWithoutLang(pathname)).toEqual('/test-path/mest-path/gest-path')
  })
  test('multiple levels, long language', () => {
    const pathname = '/en-US/test-path/mest-path/gest-path';
    expect(getPathWithoutLang(pathname)).toEqual('/test-path/mest-path/gest-path')
  })
});