import React from 'react';
import mapLayout from "../styles/components/mapLayout.module.scss";


export default ({ children, isOpen, onRequestClose }) => {
  return isOpen? (
    <div className={mapLayout.layout}>
      <div className={mapLayout.overlay}>
        {children}
      </div>
    </div>
  ) : ('');
};
