import React, { useState, useRef } from 'react';
import { Link, navigate } from 'gatsby'
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import Map from '../components/Map';
import CloseIcon from '../components/CloseIcon';
import Window from '../components/Window';
import windowStyles from '../styles/components/window.module.scss'
import { Marker, Popup, Tooltip, GeoJSON } from "react-leaflet";
import articleIconBlue from "../icons/text_ptr_blue.svg";
import articleIconPink from "../icons/text_ptr_pink.svg";
import audioIconBlue from "../icons/audio_ptr_blue.svg";
import audioIconPink from "../icons/audio_ptr_pink.svg";
import videoIconBlue from "../icons/video_ptr_blue.svg";
import videoIconPink from "../icons/video_ptr_pink.svg";
import tbdLogo from "../icons/TbD-logo.svg";
import useMapData from "../static_queries/useMapData"
import cn from 'classnames';
import L from 'leaflet';
import Img from 'gatsby-image'

// The map content is defined here as it's the same wherever the map is used.

const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 13,
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

  return typeIcons.inactive;
  return pin.id === activePinId?
         typeIcons.active : typeIcons.inactive;
}

const newIcon = (url, size) => new L.Icon({
  iconUrl: url,
  iconSize: [size, size],
  iconAnchor: [size/2, size],
  popupAnchor: [0, -size],
  tooltipAnchor: [size*0.5, -size*0.6],
  className: mapLayout.customMarker,
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

const CustomPopup = ({ node }) => {
  const popup = useRef(null);
  const closePopup = () => {
    // See https://stackoverflow.com/a/54874575/2960236
    popup.current.leafletElement.options.leaflet.map.closePopup()
  };
  const image = node.frontmatter?.hero_image?.childImageSharp?.fluid
  const audio = node.frontmatter.audio_url
  const video = node.frontmatter.video_url
  const title = node.frontmatter.title
  const youtube = audio || video || null
  const readMoreUrl = "/map/"+node.fields.slug;
  return (
    <Popup
      ref={popup}
      className={cn(mapLayout.customPopup, node.frontmatter.apposition)}
    >
      <Window
        header={
          <>
            <div>{title}</div>
            <a href="#" onClick={closePopup}><CloseIcon/></a>
          </>
        }
        footer={
          <a className={windowStyles.button}
            onClick={() => {
              closePopup()
              navigate(
                readMoreUrl,
                {
                  state: { modal: true },
                }
              )
            }}
          >
            READ MORE
          </a>
        }
      >
        <div className={windowStyles.col}>
          <div className={windowStyles.row}>
            { (video || audio || !image)? '' :
              <div className={mapLayout.heroWrapper}>
                <Img className={mapLayout.hero}
                  fluid={image}
                  alt={title}
                />
              </div>
            }
            {
              !youtube? '' :
              <div
                className={windowStyles.youtube}>
                <iframe className={windowStyles.aspectRatio} src={youtube}
                  frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                  allowfullscreen>
                </iframe> 
              </div>
            }
          </div>
          <div>{node.excerpt}</div>
        </div>
      </Window>
    </Popup>
  );
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
                const node = item.node
                const icon = selectIcon(node, activePinId)
                if (icon) {
                  return (
                    <Marker
                      key={node.id}
                      icon={icon}
                      position={[
                        node.frontmatter.latitude,
                        node.frontmatter.longitude,
                        ]}
                      className={cn(mapLayout.customMarker, node.frontmatter.apposition)}
                      riseOnHover={true}
                      closeButton={false}
                      onClick={(e) => {
                        setActivePinId(node.id);
                        const classList = e.target.getElement().classList
                        classList.add(mapLayout.active);
                      }}
                    >
                      <CustomPopup
                        node={node}
                      />
                    </Marker>
                  );
                }
                const geojson = node.frontmatter.geojson
                if (geojson) {
                  const data = JSON.parse(geojson)
                  return (
                    <GeoJSON
                      key={node.id}
                      data={data}
                      style={() => ({
                        className: cn(mapLayout.customRegion,
                                      node.frontmatter.apposition)
                      })}
                      onClick={(e) => {
                        const classList = e.target.getLayers()[0].getElement().classList
                          classList.add(mapLayout.active);
                      }}
                    >
                      <CustomPopup
                        node={node}
                      />
                    </GeoJSON>
                  )
                }
            })}
          </Map>
          <img className={mapLayout.tbdLogo} src={tbdLogo} />
        </div>
      </div>
    </Layout>
  );
}
