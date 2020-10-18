import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import MapLayout from '../components/MapLayout'
import mapLayout from '../styles/components/mapLayout.module.scss';
import splash from '../styles/components/splash.module.scss';
import cn from 'classnames';

const Splash = ({ header, footer, children, closeTo }) => (
  <div className={splash.outerWrapper}>
    <div className={splash.innerWrapper}>
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
  </div>
);


export default ({ header, footer, children }) => (
  <ModalRoutingContext.Consumer>
  {
    ({ modal, closeTo }) =>
      modal?
      <Splash header={header} footer={footer} closeTo={closeTo} >{children}</Splash>
      : // As above, but we must insert the map behind, and close to /map/
      <MapLayout className={mapLayout.modal}>
        <Splash header={header} footer={footer} closeTo="/map/" >{children}</Splash>
      </MapLayout>
  }
  </ModalRoutingContext.Consumer>
);
