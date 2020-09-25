import React from 'react';
import Layout from "../components/Layout";
import mapLayout from "../styles/components/mapLayout.module.scss";
import Map from '../components/Map';
import { Marker, Popup } from "react-leaflet";
import data from "../data.json";
import textIcon from "../icons/text_ptr_blue.svg";
import audioIcon from "../icons/audio_ptr_blue.svg";
const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 12,
  maxZoom: 12,// FIXME
};

class MapLayout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    // Init custom map icon
    this.icons = {};
    this.activePark = null;
    console.log("init");
  }
  
  componentDidMount() {
    console.log("mount");
    this.handleLoad();
    window.addEventListener('load', this.handleLoad);
    this.forceUpdate();
  }
  
  componentDidUpdate() {
    console.log("update");
    this.handleLoad();
    window.addEventListener('load', this.handleLoad);
  }
  
  componentWillUnmount() {
    console.log("unmount");
    window.removeEventListener('load', this.handleLoad)  
  }
  
  handleLoad() {
    const L = require("leaflet");
    console.log("onload", L);
    if (L) {
      this.icons.Text = new L.Icon({
        iconUrl: textIcon,
        iconSize: [32, 32]
      });
      this.icons.Audio = new L.Icon({
        iconUrl: audioIcon,
        iconSize: [64, 64]
      });
    }
    
  }

  render() {
    console.log("render", this.icons)
    const props = this.props;
    return (
      <Layout { ...props } >
        <div className={mapLayout.map_layout}>
          <main>
            {props.children}
          </main>

          <figure className={props.figureDisabled? mapLayout.figure_disabled:null}>
            <Map settings={mapSettings}>
              {data.features.map(park => {
                if (this.icons[park.type]) {
                  console.log("marker");
                  return (<Marker
                    key={park.properties.PARK_ID}
                    icon={this.icons[park.type]||undefined}
                    position={[
                      park.geometry.coordinates[0],
                      park.geometry.coordinates[1]
                    ]}
                    onClick={() => {
                      this.activePark = park;
                    }}
                    />);
                    
                }
                else {
                  console.log("no marker");
                  return (<Marker
                    key={park.properties.PARK_ID}
                    position={[
                      park.geometry.coordinates[0],
                      park.geometry.coordinates[1]
                    ]}
                    onClick={() => {
                      this.activePark = park;
                    }}
                    />)
                };
              })}
                {this.activePark && (
                  <Popup
                    position={[
                      this.activePark.geometry.coordinates[0]+0.005,
                      this.activePark.geometry.coordinates[1]
                    ]}
                    onClose={() => {
                      this.activePark = null;
                    }}
                  >
                    <div>
                      <h2>{this.activePark.properties.NAME}</h2>
                      <p>{this.activePark.properties.DESCRIPTION}</p>
                    </div>
                  </Popup>
                )}
            </Map>
          </figure>
        </div>
      </Layout>
    );
  };
}

export default MapLayout;
