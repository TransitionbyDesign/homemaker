import React from 'react'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import MapLayout from '../components/MapLayout'
import mapLayout from '../styles/components/mapLayout.module.scss';
import Splash from '../components/Splash'

export default ({ header, footer, children, className }) => (
  <ModalRoutingContext.Consumer>
  {
    ({ modal, closeTo }) =>
      modal?
      <Splash className={className} header={header} footer={footer} closeTo={closeTo} >{children}</Splash>
      : // As above, but we must insert the map behind, and close to /map/
      <MapLayout className={mapLayout.modal}>
        <Splash className={className} header={header} footer={footer} closeTo="/map/" >{children}</Splash>
      </MapLayout>
  }
  </ModalRoutingContext.Consumer>
);
