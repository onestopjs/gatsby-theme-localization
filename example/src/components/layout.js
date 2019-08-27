import React from 'react';
import {Link} from 'gatsby-theme-localization';
import '../style.css';
import { useTranslation } from 'react-i18next';

const NavItem = props => {
  return <span style={{padding: '10px'}}>
    <Link {...props} style={{color: 'white'}} />
  </span>
}

const Layout = ({children}) => {
  const [t, i18n] = useTranslation();
  return <div>
    <div style={{width: '100%', background: 'purple', padding: '10px'}}>
      <NavItem to="/" preloadNamespaces={['translation']}>{t('home')}</NavItem>
      <NavItem to="/about" preloadNamespaces={['about']}>{t('about')}</NavItem>
      <button
          style={{float: 'right', marginRight: '30px'}}
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "bg" : "en")
          }
        >
          {t("switch_language")}
        </button>
    </div>
    {children}
  </div>
};

export default Layout;
