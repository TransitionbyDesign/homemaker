import React from 'react';
import { Link } from "gatsby";
import MapLayout from "../components/MapLayout";
import WindowFrame from "../components/WindowFrame";
import windowFrame from "../styles/components/windowFrame.module.scss";

const MapPage = () => {
  return (
    <MapLayout>

      <WindowFrame styles={{left: "10rem", top: "10rem", width:"20rem"}}
        className={windowFrame.problem}>
        <header>Homemaker Oxford</header>
        <p>
          Ninety-nine percent of humanity does not know that we have the option 
          to “make it” economically on this planet and in the Universe. We do. It can 
          only be accomplished, however, through a design science initiative and tech- 
          nological revolution.
        </p>
        <footer><Link className={windowFrame.button} to="/info">READ MORE</Link> x y z</footer>
      </WindowFrame>


      <WindowFrame styles={{left: "32rem", top: "10rem", width:"15rem"}}
        className={windowFrame.solution}>
        <header>Small window</header>
        <p>
          The integrity of the individual’s enthusiasm for the now-possible success 
          of all humanity is critical to successful exercise of our option.
        </p>
        <p><Link className={windowFrame.button} to="/">READ MORE</Link></p>
      </WindowFrame>
    </MapLayout>
  );
}

export default MapPage;
