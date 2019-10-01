const getPathWithoutLanguage = (pathname: string) => {
  const split = pathname.split('/').filter(nonEmpty => nonEmpty);

  split.shift();
  const hasTrailingSlash = pathname.endsWith('/');
  return `/${split.join('/')}${hasTrailingSlash ? '/' : ''}`;
};

export default getPathWithoutLanguage;
