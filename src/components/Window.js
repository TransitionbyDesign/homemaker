import React from 'react'
import window from '../styles/components/window.module.scss';
import cn from 'classnames';

const Window = ({ header, footer, children, className }) => (
  <div className={cn(className, window.wrapper)}>
    <header className={window.header}>
      {header}
    </header>
    <div className={cn([window.content])}>
      {children}
    </div>
    <footer>
      {footer}
    </footer>
  </div>
);

export default Window;
