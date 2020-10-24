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

// The map content is defined here as it's the same wherever the map is used.

const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 12,
  minZoom: 12,
};

let icons = null;

function icon(pin, activePin) {
  if (pin === activePin) {
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
  const [activePin, setActivePin] = useState(null)
  // This window check is a work-around to some leaflet issues
  if (!icons && typeof window !== 'undefined') {
    icons = buildIcons();
  }

  return (
    <Layout { ...props }>
      <div className={mapLayout.layout}>
        <div className={mapLayout.overlay}>
          {props.children}
        </div>
        
        <div className={cn(mapLayout.map, {[mapLayout.disabled]: props.mapDisabled})}>
          <Map settings={mapSettings}>
            {data.features.map(pin => {
              if (icons && icons[pin.type]) {
                return (<Marker
                          key={pin.properties.PIN_ID}
                          icon={icon(pin, activePin)}
                          position={[
                            pin.geometry.coordinates[0],
                            pin.geometry.coordinates[1]
                          ]}
                          onClick={() => {
                            setActivePin(pin);
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
