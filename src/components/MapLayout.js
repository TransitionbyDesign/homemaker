import React, { useState, useRef } from 'react';
import { navigate } from 'gatsby'
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import Map from '../components/Map';
import CloseIcon from '../components/CloseIcon';
import Window from '../components/Window';
import windowStyles from '../styles/components/window.module.scss'
import { Marker, Popup, GeoJSON } from "react-leaflet";
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

let icons = null;

function selectIcon(pin, activePinId) {
  if (!icons) return;

  const media = pin?.fields?.media
  const apposition = pin?.frontmatter?.apposition

  const mediaIcons = icons[media];
  if (!mediaIcons) return;

  const typeIcons = mediaIcons[apposition];
  if (!typeIcons) return;

  return typeIcons;
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
      situation: newIcon(articleIconBlue, pinSize),
      solution: newIcon(articleIconPink, pinSize),
    },
    audio: {
      situation: newIcon(audioIconBlue, pinSize),
      solution: newIcon(audioIconPink, pinSize),
    },    
    video: {
      situation: newIcon(videoIconBlue, pinSize),
      solution: newIcon(videoIconPink, pinSize),
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
            <button className={windowStyles.closer} onClick={closePopup}
              aria-label="Close">
              <CloseIcon/>
            </button>
          </>
        }
        footer={
          <button className={windowStyles.button}
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
          </button>
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
                <iframe className={windowStyles.aspectRatio} src={youtube} title={title}
                  frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                  allowFullScreen>
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
                return '';
            })}
          </Map>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a target="_blank" rel="noopener referrer"
            href="https://transitionbydesign.org/"
            className={mapLayout.tbdLogo}>
            <img src={tbdLogo} alt="Transition by Design Logo"/>
          </a>
        </div>
      </div>
    </Layout>
  );
}
