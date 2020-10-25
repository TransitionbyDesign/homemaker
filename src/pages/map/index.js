import React from 'react';
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import MapLayout from "../../components/MapLayout";
import mapLayout from "../../styles/components/mapLayout.module.scss"

const MapPage = () => {
  // Detect when we've been opened via a modal link
  const className = []

  // Use the location to add a modal class if location.state.modal is set
  // This allows navigation signal the page is a modal dialog.
  const location = useLocation();
  if (location?.state?.modal) className.concat(mapLayout.modal)
  
  return (
    <MapLayout className={className}>
    </MapLayout>
  );
}

export default MapPage;
