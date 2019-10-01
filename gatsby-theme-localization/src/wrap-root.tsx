import React, {useEffect, useMemo, FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import withLocation, {WithLocationProps} from './utils/withLocation';
import getLangFromPath from './utils/getLangFromPath';
import {PluginOptions} from './types';
import getPathWithoutLang from './utils/getPathWithoutLang';

// const trimSlashes = (str: string) => {
//   const withoutTrailing = str.endsWith("/")
//     ? str.substring(0, str.length - 1)
//     : str;
//   const withoutPrepended = withoutTrailing.startsWith("/")
//     ? withoutTrailing.substring(1)
//     : withoutTrailing;
//   return withoutPrepended;
// };

const trimSlashes = (str: string, c = '/') => {
  if (c === ']') c = '\\]';
  if (c === '\\') c = '\\\\';
  return str.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), '');
};

interface WrapRootProps extends WithLocationProps {
  children: React.ReactNode;
  options: PluginOptions;
}

const WrapRoot: FunctionComponent<WrapRootProps> = ({
  children,
  location,
  navigate,
  options: {languages = [], allowIndex = false, defaultLng = 'en'}
}) => {
  const [, i18n] = useTranslation();
  const lang = useMemo(() => {
    return getLangFromPath(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    if (languages.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, languages]);

  useEffect(() => {
    const currentLang = lang;
    if (languages.includes(currentLang) && currentLang !== i18n.language) {
      const currentPathWithoutLanguage = getPathWithoutLang(location.pathname);
      const trimmedPath = trimSlashes(currentPathWithoutLanguage);
      const newPath = `/${i18n.language}/${trimmedPath}${
        trimmedPath ? '/' : ''
      }`;
      navigate(newPath);
    }
  }, [i18n.language, languages, lang, navigate, location.pathname]);

  const renderChildren = useMemo(() => {
    if (allowIndex) return true;
    if (location.pathname === '/') {
      return allowIndex;
    }

    return true;
  }, [location.pathname, allowIndex]);

  useEffect(() => {
    if (!renderChildren) {
      const probableLanguage = navigator.language;
      navigate(
        `/${
          languages.includes(probableLanguage) ? probableLanguage : defaultLng
        }/`,
        {replace: true}
      );
    }
  }, [renderChildren, navigate, languages]);

  return <>{children}</>;
};

export default withLocation<WrapRootProps>(WrapRoot);
