import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';
import mapStyles from './Map.module.css';

const isDomAvailable = typeof window !== 'undefined';

const accessToken = process.env.GATSBY_MAP_ACCESS_TOKEN || '';
const defaultTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const defaultAttribution =
  '<a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors';

if ( isDomAvailable ) {
  // To get around an issue with the default icon not being set up right between using React
  // and importing the leaflet library, we need to reset the image imports
  // See https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
    iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
    shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' )
  });
}

const Map = ({ children, settings, url, attribution }) => {
  if ( !isDomAvailable ) {
    return (
      <div className={mapStyles.map}>
        <p className={mapStyles.mapLoading}>Loading map...</p>
      </div>
    );
  }

  // We have to work around forestry.io's limitations in the fields it can provide.
  // Specifically, it doesn't yet support an array of numbers, so we have to convert two fields
  // into the `center` array.
  const center = [settings.latitude || 0, settings.longitude || 0]
  const mapSettings = {
    className: mapStyles.mapBase,
    zoomControl: false,
    center: center,
    zoom: 4,
    ...settings
  };
  delete mapSettings.latitude;
  delete mapSettings.longitude;

  return (
    <div className={mapStyles.map}>
      <BaseMap {...mapSettings}>
        <TileLayer
          url={(url || defaultTileUrl).replace('{token}', accessToken)}
          attribution={attribution || defaultAttribution}
        />
        <ZoomControl position="topright" />
        { children }
      </BaseMap>
    </div>
  );
};

Map.propTypes = {
  children: PropTypes.node,
  settings: PropTypes.object,
  className: PropTypes.string,
  defaultBaseMap: PropTypes.string,
  mapEffect: PropTypes.func,
};

export default Map;
