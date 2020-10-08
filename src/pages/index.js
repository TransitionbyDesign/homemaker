import React from 'react';
import { Link } from "gatsby";
import MapLayout from "../components/MapLayout";
import splash from '../styles/components/splash.module.scss';
import cn from 'classnames';

const MapPage = () => {
  return (
    <MapLayout>
      <div className={cn([splash.wrapper])}>
        <header>Welcome</header>
        <div className={cn([splash.content])}>
          <h1>Welcome to Homemaker Oxford</h1>
          
          <p>Link to <Link to="/info">Info</Link></p>
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
    </MapLayout>
  );
}

export default MapPage;
