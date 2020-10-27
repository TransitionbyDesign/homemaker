import React, { useState } from 'react';
import { Link, navigate } from 'gatsby'
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import Map from '../components/Map';
import { Marker, Popup } from "react-leaflet";
import articleIconBlue from "../icons/text_ptr_blue.svg";
import articleIconPink from "../icons/text_ptr_pink.svg";
import audioIconBlue from "../icons/audio_ptr_blue.svg";
import audioIconPink from "../icons/audio_ptr_pink.svg";
import videoIconBlue from "../icons/video_ptr_blue.svg";
import videoIconPink from "../icons/video_ptr_pink.svg";
import useMapData from "../static_queries/useMapData"
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

function selectIcon(pin, activePinId) {
  if (!icons) return;

  const mediaIcons = icons[pin.media];
  if (!mediaIcons) return;

  const typeIcons = mediaIcons[pin.type];
  if (!typeIcons) return;

  return pin.id === activePinId?
         typeIcons.active : typeIcons.inactive;
}

function buildIcons() {
  return {
    article: {
      problem: {
        inactive: new L.Icon({
          iconUrl: articleIconBlue,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: articleIconBlue,
          iconSize: [activePinSize, activePinSize]
        }),
      },
      solution: {
        inactive: new L.Icon({
          iconUrl: articleIconPink,
          iconSize: [pinSize, pinSize]
        }),
        active: new L.Icon({
          iconUrl: articleIconPink,
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
  const [activePinId, setActivePinId] = useState(null)
  // This window check is a work-around to some leaflet issues
  if (!icons && typeof window !== 'undefined') {
    icons = buildIcons();
  }
  const mapData = useMapData()
  console.log("mapData",mapData);
  return (
    <Layout { ...props }>
      <div className={mapLayout.layout}>
        <div className={mapLayout.overlay}>
          {props.children}
        </div>
        
        <div className={cn(mapLayout.map, {[mapLayout.disabled]: props.mapDisabled})}>
          <Map settings={mapSettings}>
            {mapData.map(item => {
              const pin = item.node
              pin.media = "article"
              pin.type = "problem"
              const icon = selectIcon(pin, activePinId)
              if (icon) {
                return (<Marker
                          key={pin.id}
                          icon={icon}
                          position={[
                            pin.frontmatter.latitude,
                            pin.frontmatter.longitude,
                          ]}
                          riseOnHover={true}
                          onClick={() => {
                            setActivePinId(pin.id);
                            navigate(
                              "/map/"+pin.fields.slug,
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
