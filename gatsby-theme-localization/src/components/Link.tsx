import React, { useMemo, FunctionComponent, useCallback } from 'react';
import {Link as GatsbyLink, GatsbyLinkProps} from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Namespace } from '../types';

// had to exclude ref, see this issue: https://github.com/gatsbyjs/gatsby/issues/16682
interface LinkProps extends Omit<GatsbyLinkProps<{}>, 'ref'> {
  prefixLanguage: boolean;
  preloadNamespaces: Namespace[];
}

const Link: FunctionComponent<LinkProps> = ({to, prefixLanguage, preloadNamespaces, ...props}) => {
  const [, i18n] = useTranslation();
  
  const enhancedTo = useMemo(() => {
    if(!prefixLanguage) return to;
    
    return `/${i18n.language}${to}`;
  }, [i18n.language, prefixLanguage, to]);

  const handleMouseOver = useCallback(() => {
    if(!!preloadNamespaces){
      i18n.loadNamespaces(preloadNamespaces)
    }
  }, [i18n, preloadNamespaces]);

  return <GatsbyLink to={enhancedTo} onMouseOver={handleMouseOver} {...props} />
};

Link.defaultProps = {
  prefixLanguage: true
}

export default Link;
