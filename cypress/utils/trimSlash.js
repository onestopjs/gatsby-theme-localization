const trimSlash = pathname =>
  pathname.endsWith('/')
    ? pathname.substring(0, pathname.length - 1)
    : pathname;

export default trimSlash;
