import React, { useMemo, FunctionComponent } from 'react';
import {Link as GatsbyLink, GatsbyLinkProps} from 'gatsby';
import { useTranslation } from 'react-i18next';

// had to exclude ref, see this issue: https://github.com/gatsbyjs/gatsby/issues/16682
interface LinkProps extends Omit<GatsbyLinkProps<{}>, 'ref'> {
  prefixLanguage: boolean;
}

const Link: FunctionComponent<LinkProps> = ({to, prefixLanguage, ...props}) => {
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
