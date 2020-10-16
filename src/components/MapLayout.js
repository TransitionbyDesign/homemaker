import React, { useState } from 'react';
import { Link, navigate } from 'gatsby'
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import Map from '../components/Map';
import { Marker, Popup } from "react-leaflet";
import data from "../data.json";
import textIcon from "../icons/text_ptr_blue.svg";
import audioIcon from "../icons/audio_ptr_blue.svg";
import cn from 'classnames';
import L from 'leaflet';

const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 12,
  minZoom: 12,
};

let icons = null;

function icon(park, activePark) {
  if (park === activePark) {
    return icons.Audio;
  }
  else {
    return icons.Text;
  }
}

function buildIcons() {
  return {
    Text: new L.Icon({
      iconUrl: textIcon,
      iconSize: [32, 32]
    }),
    Audio: new L.Icon({
      iconUrl: audioIcon,
      iconSize: [64, 64]
    }),
  };
}

export default (props) => {
  const [activePark, setActivePark] = useState(null)
  // This window check is a work-around to some leaflet issues
  if (!icons && typeof window !== 'undefined') {
    icons = buildIcons();
  }
  return (
    <Layout { ...props } >
      <div className={mapLayout.map_layout}>
        <div className={mapLayout.overlay}>
          {props.children}
        </div>
        
        <div className={cn(mapLayout.map, {[mapLayout.figure_disabled]: props.mapDisabled})}>
          <Map settings={mapSettings}>
            {data.features.map(park => {
              if (icons && icons[park.type]) {
                return (<Marker
                          key={park.properties.PARK_ID}
                          icon={icon(park, activePark)}
                          position={[
                            park.geometry.coordinates[0],
                            park.geometry.coordinates[1]
                          ]}
                          onClick={() => {
                            setActivePark(park);
                            navigate(
                              "/map/modal",
                              {
                                state: { modal: true },
                              }
                            )
                          }}
                />);
                
              }
            })}
          </Map>
        </div>
      </div>
    </Layout>
  );
}
