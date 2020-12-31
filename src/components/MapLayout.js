import React, { useState, useRef } from 'react';
import { navigate } from 'gatsby'
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import textLayout from "../styles/components/text.module.scss";
import Map from '../components/Map';
import CloseIcon from '../components/CloseIcon';
import MinimiseIcon from '../components/MinimiseIcon';
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
import config from "../../config.json"
import cn from 'classnames';
import L from 'leaflet';
import Img from 'gatsby-image'

const pinSize = config.map.pinSize;
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

const InfoPopup = ({ title, buttonLink, text, footerText }) => {
  const [isMinimised, setIsMinimised] = useState(false);
  const closePopup = () => { setIsMinimised(!isMinimised) };
  return (
    <div className={mapLayout.infoPopupWrapper}>
      <div className={cn(mapLayout.minimisable, {[mapLayout.minimised]: isMinimised})}>
        <Window
          className={cn(mapLayout.infoPopupWindow, 'situation')}
          header={
          <>
            <div>{title}</div>
            <button className={windowStyles.closer} onClick={closePopup}
              aria-label="Minimise">
              <MinimiseIcon />
            </button>
          </>
        }
        footer={
          <div>
            <button className={windowStyles.button}
              onClick={() => {
                closePopup()
                navigate(
                  buttonLink,
                  {
                    state: { modal: true },
                  }
                )
              }}
            >
              READ MORE
            </button>
          </div>
        }
        >
          <div className={cn(windowStyles.col, windowStyles.scrollY, textLayout.body)}>
            <div dangerouslySetInnerHTML={{__html: text}} />
            <h3>Legend</h3>
              <table className={mapLayout.legendTable}>
                <tbody>
                  <tr>
                    <td>
                      <img className={mapLayout.legendImg} alt="Problem Article Pointer" title="Problem Article" src={articleIconBlue} />
                    </td>
                    <td>
                      <img className={mapLayout.legendImg} alt="Solution Article Pointer" title="Solution Article" src={articleIconPink} />
                    </td>
                    <td>
                      Written piece
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img className={mapLayout.legendImg} alt="Problem Audio Pointer" title="Problem Audio" src={audioIconBlue} />
                                           </td>
                     <td>
                       <img className={mapLayout.legendImg} alt="Solution Audio Pointer" title="Solution Audio" src={audioIconPink} />
                     </td>
                     <td>
                       Audio
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <img className={mapLayout.legendImg} alt="Problem Video Pointer" title="Problem Video" src={videoIconBlue} />
                     </td>
                     <td>
                       <img className={mapLayout.legendImg} alt="Solution Video Pointer" title="Solution Video" src={videoIconPink} />
                     </td>
                     <td>
                       Video
                     </td>
                   </tr>
                 </tbody>
              </table>
            <div dangerouslySetInnerHTML={{__html: footerText}} />
          </div>
        </Window>
      </div>
    </div>
  );
}



const CustomPopup = ({ node }) => {
  const popup = useRef(null);
  const closePopup = () => {
    // See https://stackoverflow.com/a/54874575/2960236
    popup.current.leafletElement.options.leaflet.map.closePopup()
  };
  const image = node.frontmatter?.hero_image?.childImageSharp?.fluid
  const title = node.frontmatter.title
  const youtube = node.frontmatter.youtube_url
  const readMoreUrl = "/map/"+node.fields.slug;
  const summary = node.frontmatter.summary || node.excerpt
  return (
    <Popup
      ref={popup}
      className={cn(mapLayout.customPopup, node.frontmatter.apposition)}
    >
      <Window
        header={
          <>
            <div className={windowStyles.truncate}>{title}</div>
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
            { (youtube || !image)? '' :
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
          <div dangerouslySetInnerHTML={{__html: summary}} />
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
  const sidebar = mapData.sidebar
  console.log("mapData",mapData);
  return (
    <Layout { ...props } eventPassThru>
      <div className={mapLayout.layout}>
        <div className={mapLayout.overlay}>
          <InfoPopup
            title={sidebar.frontmatter.title}
            text={sidebar.html}
            footerText={sidebar.frontmatter.legend_text}
            buttonLink={sidebar.frontmatter.button_url}
          />
        </div>
        <div className={mapLayout.overlay}>
          {props.children}
        </div>

        <div className={cn(mapLayout.map, {[mapLayout.disabled]: props.mapDisabled})}>
          <Map settings={config.map.settings}
            attribution={config.map.attribution}
            url={config.map.tileLayerUrl}
          >
            {mapData
              .pins
              .filter((item) => item?.node?.frontmatter?.is_published)
              .map(item => {
                const node = item.node
                const icon = selectIcon(node, activePinId)
                const latitude = node.frontmatter.latitude
                const longitude = node.frontmatter.longitude

                // If an article has a region field defined, use that preferentially
                const geojson = node.frontmatter.region
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
                        classList.add(mapLayout.active)
                      }}
                    >
                      <CustomPopup
                        node={node}
                      />
                    </GeoJSON>
                  )
                }
                
                // Add pins for articles with a valid icon, and a location
                if (icon && latitude != null && longitude != null) {
                  return (
                    <Marker
                      key={node.id}
                      icon={icon}
                      position={[latitude, longitude]}
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
                console.warn(`article has no location, icon, or region: `+
                             `id=${node.id} slug=${node.fields.slug}`);
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
