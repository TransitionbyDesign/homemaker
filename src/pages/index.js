import React from 'react';
import { Link } from "gatsby";
import Layout from "../components/Layout";
import AspectRatio from 'react-aspect-ratio';
import Map from '../components/Map';
import { Marker, Popup } from "react-leaflet";
import data from "../data.json";

const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 12,
};

const IndexPage = () => {
  const [activePark, setActivePark] = React.useState(null);

  return (
    <Layout>
      <h1>Homemaker Oxford demo</h1>
      <p>
	      This is just a fairly trivial proof-of-concept of a map with some pins on it.
        A descriptions could go here. There could be links, and more pages.
	    </p>
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
    </Layout>
  )
}

export default IndexPage
