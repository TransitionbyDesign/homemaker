import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import MapLayout from '../components/MapLayout'
import splash from '../styles/components/splash.module.scss';
import cn from 'classnames';

export default ({header, footer, children}) => (
  <ModalRoutingContext.Consumer>        
    {
      ({ modal, closeTo }) => {
        if (modal) {
          return (
            <div className={splash.wrapper}>
              <header className={splash.header}>
                {header}
                
                <Link className={splash.closeLink} to={closeTo}>
                  &#x2A2F;
                </Link>
              </header>
              <div className={cn([splash.content])}>
                {children}
              </div>
              <footer>
                {footer}
              </footer>
            </div>
          );
        }
        else {
          return (  // As above, but we must insert the map behind
            <MapLayout>
              <div className={splash.wrapper}>
                <header className={splash.header}>
                  {header}                  
                  <Link className={splash.closeLink} to="/map/">
                    &#x2A2F;
                  </Link>
                </header>
                <div className={cn([splash.content])}>
                  {children}
                </div>
                <footer>
                  {footer}
                </footer>
              </div>
            </MapLayout>
          );
        }
      }
    }
  </ModalRoutingContext.Consumer>
);
