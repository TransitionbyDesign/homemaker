import React from 'react'
import socialLinkStyles from '../styles/components/socialLink.module.scss';
import cn from 'classnames';

const SocialLink = ({ logo, alt, to, children }) => (
  <a
    className={socialLinkStyles.link}
    href={to}>
    <span className={socialLinkStyles.altText}>{children}</span>
    <img className={socialLinkStyles.img} src={logo} alt={alt} />
  </a>
);

export default SocialLink;
