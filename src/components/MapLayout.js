import React from 'react';
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

class MapLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePark: null };
  }
  
  buildIcons() {
    this.icons = {
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
  
  render() {
    const props = this.props;
    // This window check is a work-around to some leaflet issues
    if (!this.icons && typeof window !== 'undefined') {
      this.buildIcons();
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
                if (this.icons && this.icons[park.type]) {
                  return (<Marker
                            key={park.properties.PARK_ID}
                            icon={this.icons[park.type]||undefined}
                            position={[
                              park.geometry.coordinates[0],
                              park.geometry.coordinates[1]
                            ]}
                            onClick={() => {
                              this.setState({activePark: park});
                            }}
                  />);
                  
                }
              })}
              {this.state.activePark && (
                <Popup
                  position={[
                    this.state.activePark.geometry.coordinates[0]+0.005,
                    this.state.activePark.geometry.coordinates[1]
                  ]}
                  onClose={() => {
                    this.setState({activePark:null});
                  }}
                >
                  <div>
                    <h2>{this.state.activePark.properties.NAME}</h2>
                    <p>{this.state.activePark.properties.DESCRIPTION}</p>
                  </div>
                </Popup>
              )}
            </Map>
          </div>
        </div>
      </Layout>
    );
  };
}

export default MapLayout;
