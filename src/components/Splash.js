import React from 'react'
import { Link } from 'gatsby'
import splash from '../styles/components/splash.module.scss';
import Window from './Window.js'
import cn from 'classnames';

const Splash = ({ header, footer, children, closeTo, className }) => (
  <div className={cn(className, splash.wrapper)}>
    <Window
      footer={footer}
      className={className}
      header={
        <>
          {header}
          {!closeTo ? '' :
           <Link className={splash.closeLink} to={closeTo}>
             <svg style={{width: "1em"}} viewBox="0 0 386.667 386.667"
               xmlns="http://www.w3.org/2000/svg">
               <path d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z"/>
             </svg>
           </Link>
          }
        </>
      }>
      {children}
    </Window>
  </div>
);

export default Splash;
