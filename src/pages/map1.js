import React from 'react';
import { Link } from "gatsby";
import Layout from "../components/layout";
import AspectRatio from 'react-aspect-ratio';
import SEO from "../components/seo";
import Helmet from 'react-helmet';
import Map from '../components/Map';
import { Marker, Popup, GeoJSON } from "react-leaflet";
import rar from 'react-aspect-ratio/aspect-ratio.css';
import data from "../data.json";
import footpaths from "../mutated1.json";

console.log(rar+''); // work around overzealous dependency pruning

const mapSettings = {
  center: [51.7522, -1.2560],
  zoom: 12,
  scrollWheelZoom: false,
};

const Page = () => {
  const [activePark, setActivePark] = React.useState(null);

  return (
    <Layout>
      <Helmet>
        <title>Generic - Forty by HTML5 UP</title>
        <meta name="description" content="Generic Page" />
      </Helmet>
      <SEO title="Homemaker Oxford project" />

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>Map Demo 1</h1>
            </header>
            <p>This is just a fairly trivial proof-of-concept of a map with some pins on it, and
              public data of Oxfordshire footpaths, added using a GeoJSON layer.
              Other descriptions could go here. There could be links, and more pages.
	          </p>
            <span className="image main">

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
                  <GeoJSON key='footpaths-key' data={footpaths}/>
                </Map>
              </AspectRatio>
            </span>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Page
