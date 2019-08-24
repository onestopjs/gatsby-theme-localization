import React, { useEffect, useMemo } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import withLocation from "./utils/withLocation";
import getLangFromPathname from "./utils/getLangFromPathname";

const trimSlashes = str => {
  const withoutTrailing = str.endsWith("/")
    ? str.substring(0, str.length - 1)
    : str;
  const withoutPrepended = withoutTrailing.startsWith("/")
    ? withoutTrailing.substring(1)
    : withoutTrailing;
  return withoutPrepended;
};

const WrapRoot = ({
  children,
  i18n: i18nInstance,
  location,
  navigate,
  options: { languages = [], allowIndex = false, defaultLng = "en" }
}) => {
  const [, i18n] = useTranslation();

  const lang = useMemo(() => {
    return getLangFromPathname(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (languages.includes(lang) && i18nInstance.language !== lang) {
      i18nInstance.changeLanguage(lang);
    }
  }, [lang, i18nInstance, languages]);

  useEffect(() => {
    const currentLang = lang;
    if (languages.includes(currentLang) && currentLang !== i18n.language) {
      const currentPathWithoutLanguage = location.pathname.substring(3);
      const newPath = `/${i18n.language}/${trimSlashes(
        currentPathWithoutLanguage
      )}`;
      navigate(newPath);
    }
  }, [i18n.language, languages, lang, navigate, location.pathname]);

  const renderChildren = useMemo(() => {
    if (allowIndex) return true;
    if (location.pathname === "/") {
      return allowIndex;
    }

    return true;
  }, [location.pathname, allowIndex]);

  if (!renderChildren) {
    const probableLanguage = navigator.language;
    navigate(
      `/${
        languages.includes(probableLanguage) ? probableLanguage : defaultLng
      }`,
      { replace: true }
    );
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
};

export default withLocation(WrapRoot);
