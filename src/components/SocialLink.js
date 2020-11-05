import React from 'react'
import socialLinkStyles from '../styles/components/socialLink.module.scss';

const SocialLink = ({ logo, alt, title, to, children }) => (
  <a
    className={socialLinkStyles.link}
    href={to} target="_blank">
    <span className={socialLinkStyles.altText}>{children}</span>
    <img title={title} className={socialLinkStyles.img} src={logo} alt={alt} />
  </a>
);

export default SocialLink;
