import React, { useState } from 'react';
import { Link, navigate } from 'gatsby'
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import Map from '../components/Map';
import { Marker, Popup, Tooltip } from "react-leaflet";
import articleIconBlue from "../icons/text_ptr_blue.svg";
import articleIconPink from "../icons/text_ptr_pink.svg";
import audioIconBlue from "../icons/audio_ptr_blue.svg";
import audioIconPink from "../icons/audio_ptr_pink.svg";
import videoIconBlue from "../icons/video_ptr_blue.svg";
import videoIconPink from "../icons/video_ptr_pink.svg";
import shadowIcon from "../icons/shadow_ptr.svg";
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

  const media = pin?.fields?.media
  const apposition = pin?.frontmatter?.apposition

  const mediaIcons = icons[media];
  if (!mediaIcons) return;

  const typeIcons = mediaIcons[apposition];
  if (!typeIcons) return;

  return pin.id === activePinId?
         typeIcons.active : typeIcons.inactive;
}

const newIcon = (url, size) => new L.Icon({
  iconUrl: url,
  iconSize: [size, size],
  iconAnchor: [size/2, size],
  shadowUrl: shadowIcon,
  shadowSize: [size*1.5, size*0.9],
  shadowAnchor: [size*.75, size*0.9],
  popupAnchor: [0, 0],
  tooltipAnchor: [size*0.5, -size*0.6],
  className: mapLayout.customIcon,
})

function buildIcons() {
  return {
    articles: {
      situation: {
        inactive: newIcon(articleIconBlue, pinSize),
        active: newIcon(articleIconBlue, activePinSize),
      },
      solution: {
        inactive: newIcon(articleIconPink, pinSize),
        active: newIcon(articleIconPink, activePinSize),
      },
    },
    audio: {
      situation: {
        inactive: newIcon(audioIconBlue, pinSize),
        active: newIcon(audioIconBlue, activePinSize),
      },
      solution: {
        inactive: newIcon(audioIconPink, pinSize),
        active: newIcon(audioIconPink, activePinSize),
      },
    },    
    video: {
      situation: {
        inactive: newIcon(videoIconBlue, pinSize),
        active: newIcon(videoIconBlue, activePinSize),
      },
      solution: {
        inactive: newIcon(videoIconPink, pinSize),
        active: newIcon(videoIconPink, activePinSize),
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
    <Layout { ...props } eventPassThru>
      <div className={mapLayout.layout}>
        <div className={mapLayout.overlay}>
          {props.children}
        </div>
        
        <div className={cn(mapLayout.map, {[mapLayout.disabled]: props.mapDisabled})}>
          <Map settings={mapSettings}>
            {mapData
              .filter((item) => item?.node?.frontmatter?.is_published)
              .map(item => {
                const pin = item.node
                const icon = selectIcon(pin, activePinId)
                if (icon) {
                  return (
                    <Marker
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
                    >
                      <Tooltip
                        className={cn(mapLayout.customTooltip, mapLayout[pin.frontmatter.apposition])}
                      >
                        {pin.frontmatter.title}
                      </Tooltip>
                    </Marker>
                  );
                }
            })}
          </Map>
        </div>
      </div>
    </Layout>
  );
}
