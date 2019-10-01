const getLangFromPath = (pathname: string) => {
  const split = pathname.split('/').filter(nonEmpty => nonEmpty);
  return split[0];
};

export default getLangFromPath;
