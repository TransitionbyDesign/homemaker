import React from 'react';
import { Link } from "gatsby";
import Layout from "../components/layout";
import AspectRatio from 'react-aspect-ratio';
import SEO from "../components/seo";
import Map from '../components/Map';
import { Marker, Popup } from "react-leaflet";
import rar from 'react-aspect-ratio/aspect-ratio.css';
import data from "../data.json";

console.log(rar+''); // work around overzealous dependency pruning

const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 12,
};
function MapPage(){
  const [activePark, setActivePark] = React.useState(null);
  
  return(
    <Layout>
    <SEO title="Map page" />
    <h1>Hi from the map page</h1>
    <p>Welcome to the Oxford map page</p>
    <AspectRatio ratio="560/315" style={{ width: '100%' }}>
    <Map settings={mapSettings}>
      {data.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            position={[
              park.geometry.coordinates[0],
              park.geometry.coordinates[1]
            ]}
            onClick={() => {
              setActivePark(park);
            }}
          />
      ))}
        {activePark && (
          <Popup
            position={[
              activePark.geometry.coordinates[0]+0.005,
              activePark.geometry.coordinates[1]
            ]}
            onClose={() => {
              setActivePark(null);
            }}
          >
            <div>
              <h2>{activePark.properties.NAME}</h2>
              <p>{activePark.properties.DESCRIPTION}</p>
            </div>
          </Popup>
        )}
    </Map>
    </AspectRatio>
    <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}

export default MapPage;
