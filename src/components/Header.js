import React from "react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import headerStyles from "../styles/components/header.module.scss"
import whiteLogo from "../icons/homemaker_logo_white.svg"
import blueLogo from "../icons/homemaker_logo_blue.svg"

/**
 * The header is present on all pages, but can take different
 * styles depending on the page.
 *
 * Essentually, however, it's just the Homemaker icon, with a title,
 * which is normally hidden, present only for those using a screen reader.
 */

export default function Header(props) {
  // Use the right logo, which depends on the background, which
  // depends on the modal flag
  const { state } = useLocation();
  const logo = state?.modal ? whiteLogo : blueLogo;
  
  return (
    <header
      className={headerStyles.header}
    >
      <nav
        className={headerStyles.header__nav}
        role="navigation"
        aria-label="main navigation"
      >

        <Link to="/"><img className={headerStyles.logo} alt="Logo: Homemaker Oxford" src={logo} /></Link>
        <h1>
          <Link to="/">{props.title}</Link>
        </h1>
      </nav>
    </header>
  )
}
