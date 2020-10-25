import React from 'react'
import { Link } from 'gatsby'
import splash from '../styles/components/splash.module.scss';
import cn from 'classnames';

const Splash = ({ header, footer, children, closeTo }) => (
  <div className={splash.outerWrapper}>
    <div className={splash.innerWrapper}>
      <header className={splash.header}>
        {header}

        { closeTo &&
          <Link className={splash.closeLink} to={closeTo}>
            &#x2A2F;
          </Link>
        }
      </header>
      <div className={cn([splash.content])}>
        {children}
      </div>
      <footer>
        {footer}
      </footer>
    </div>
  </div>
);

export default Splash;
