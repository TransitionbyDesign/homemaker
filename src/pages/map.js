import React from 'react';
import { Link } from "gatsby";
import Layout from "../components/layout";
import AspectRatio from 'react-aspect-ratio';
import SEO from "../components/seo";
import Map from '../components/Map';
import 'react-aspect-ratio/aspect-ratio.css';

const MapPage = () => (
    <Layout>
    <SEO title="Map page" />
    <h1>Hi from the map page</h1>
    <p>Welcome to the map page</p>
    <AspectRatio ratio="560/315" style={{ width: '100%' }}>
    <Map />
    </AspectRatio>
    <Link to="/">Go back to the homepage</Link>
    </Layout>
);

export default MapPage;
