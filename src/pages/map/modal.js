// pages/modal-example.js

import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import ModalPage from '../../components/ModalPage'
import splash from '../../styles/components/splash.module.scss';
import cn from 'classnames';



const ModalExamplePage = () => {
  // Ensure that whatever happens, the modal state flag is set
  // This ensures the pages and layouts are correct.
  const location = useLocation();
  location.state = { ...location.state = {}, modal: true };
  return (
    <ModalPage
      header="Welcome"
      footer={
        <Link to="/map" className={splash.button}>EXPLORE THE MAP</Link>    
      }>
      <h1>Welcome to Homemaker Oxford</h1>

      <p>Link to <Link to="/map/modal" state={{modal: true}} >Modal</Link></p>
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
      
    </ModalPage>
)
}

export default ModalExamplePage
