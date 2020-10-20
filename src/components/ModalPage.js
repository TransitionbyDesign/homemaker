import React from 'react'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import MapLayout from '../components/MapLayout'
import mapLayout from '../styles/components/mapLayout.module.scss';
import Splash from '../components/Splash'

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
