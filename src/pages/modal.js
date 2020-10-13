// pages/modal-example.js

import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import splash from '../styles/components/splash.module.scss';
import cn from 'classnames';

const ModalExamplePage = () => (
  <ModalRoutingContext.Consumer>
    
    {({ modal, closeTo }) => (
      <div className={splash.wrapper}>
        <header className={splash.header}>Welcome</header>
        <div className={cn([splash.content])}>
          <h1>Welcome to Homemaker Oxford</h1>

          {modal ? (
            <Link to={closeTo}>
              Close
            </Link>
          ) : ''}
          
          <p>Link to <Link to="/modal" state={{modal: true}} >Modal</Link></p>
          <p>Link to <Link to="/map">Map</Link></p>
          
          <div className={splash.columned}>
            <p>
              Humanity is moving ever deeper into crisis — a crisis without precedent.
            </p>
            <p>
              First, it is a crisis brought about by cosmic evolution irrevocably intent 
              upon completely transforming omnidisintegrated humanity from a complex 
              of around-the-world, remotely-deployed-from-one-another, differently colored,
              differently credoed, differently cultured, differently communicating, 
              and differently competing entities into a completely integrated, comprehensively
              interconsiderate, harmonious whole.
            </p>
            
            
          </div>
          
        </div>
        <footer>
          <Link to="/map" className={splash.button}>EXPLORE THE MAP</Link>
        </footer>
      </div>
    )}
  </ModalRoutingContext.Consumer>
)

export default ModalExamplePage
