import React, { useState } from 'react';
import { Link, navigate } from 'gatsby'
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import Map from '../components/Map';
import { Marker, Popup } from "react-leaflet";
import data from "../data.json";
import textIconBlue from "../icons/text_ptr_blue.svg";
import textIconPink from "../icons/text_ptr_pink.svg";
import audioIconBlue from "../icons/audio_ptr_blue.svg";
import audioIconPink from "../icons/audio_ptr_pink.svg";
import videoIconBlue from "../icons/video_ptr_blue.svg";
import videoIconPink from "../icons/video_ptr_pink.svg";
import cn from 'classnames';
import L from 'leaflet';

// The map content is defined here as it's the same wherever the map is used.

const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 12,
  minZoom: 12,
};
const pinSize = 32;
const activePinSize = 64;

let icons = null;

function selectIcon(pin, activePin) {
  if (!icons) return;

  const mediaIcons = icons[pin.media];
  if (!mediaIcons) return;

  const typeIcons = mediaIcons[pin.type];
  if (!typeIcons) return;
  
  return pin === activePin?
         typeIcons.active : typeIcons.inactive;
}

function buildIcons() {
  return {
    text: {
      problem: {
        inactive: new L.Icon({
          iconUrl: textIconBlue,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: textIconBlue,
          iconSize: [activePinSize, activePinSize]
        }),
      },
      solution: {
        inactive: new L.Icon({
          iconUrl: textIconPink,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: textIconPink,
          iconSize: [activePinSize, activePinSize]
        }),
      },
    },
    audio: {
      problem: {
        inactive: new L.Icon({
          iconUrl: audioIconBlue,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: audioIconBlue,
          iconSize: [activePinSize, activePinSize]
        }),
      },
      solution: {
        inactive: new L.Icon({
          iconUrl: audioIconPink,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: audioIconPink,
          iconSize: [activePinSize, activePinSize]
        }),
      },
    },    
    video: {
      problem: {
        inactive: new L.Icon({
          iconUrl: videoIconBlue,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: videoIconBlue,
          iconSize: [activePinSize, activePinSize]
        }),
      },
      solution: {
        inactive: new L.Icon({
          iconUrl: videoIconPink,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: videoIconPink,
          iconSize: [activePinSize, activePinSize]
        }),
      },
    },    
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
              const icon = selectIcon(pin, activePin)
              if (icon) {
                return (<Marker
                          key={pin.properties.PIN_ID}
                          icon={icon}
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
