import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import splash from '../styles/components/splash.module.scss';
import cn from 'classnames';

export default ({header, footer, children}) => (
  <ModalRoutingContext.Consumer>
    
    {({ modal, closeTo }) => (
      <div className={splash.wrapper}>
        <header className={splash.header}>
          {header}
          
          {modal ? (
            <Link className={splash.closeLink} to={closeTo}>
            &#x2A2F;
            </Link>
          ) : (
            <Link className={splash.closeLink} to="/map/">
            &#x2A2F;
            </Link>
          )}
        </header>
        <div className={cn([splash.content])}>
          {children}
        </div>
        <footer>
          {footer}
        </footer>
      </div>
    )}
  </ModalRoutingContext.Consumer>
);
