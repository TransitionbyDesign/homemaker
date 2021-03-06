import React from 'react'
import { Link } from 'gatsby'
import splash from '../styles/components/splash.module.scss';
import window from '../styles/components/window.module.scss';
import Window from './Window.js'
import CloseIcon from './CloseIcon'

const Splash = ({ header, footer, children, closeTo, className }) => (
  <div className={splash.wrapper}>
    <Window
      footer={footer}
      className={className}
      header={
        <>
          {header}
          {!closeTo ? '' :
           <Link className={window.closer} to={closeTo}>
             <CloseIcon/>
           </Link>
          }
        </>
      }>
      {children}
    </Window>
  </div>
);

export default Splash;
