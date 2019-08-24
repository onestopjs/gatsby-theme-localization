import React, { useMemo } from 'react';
import {Link as GatsbyLink} from 'gatsby';
import { useTranslation } from 'react-i18next';

const Link = ({to, prefixLanguage, ...props}) => {
  const [, i18n] = useTranslation();
  
  const enhancedTo = useMemo(() => {
    if(!prefixLanguage) return to;
    
    return `/${i18n.language}${to}`;
  }, [i18n.language, prefixLanguage, to]);
  return <GatsbyLink to={enhancedTo} {...props} />
};

Link.defaultProps = {
  prefixLanguage: true
}

export default Link;
