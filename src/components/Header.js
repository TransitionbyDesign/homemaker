import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'

const Header = (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <header id="header" className="alt">
      <Link to="/" className="logo"><strong>{data.site.siteMetadata.title}</strong> <span>by Transition by Design</span></Link>
      <nav>
        <a className="menu-link" onClick={props.onToggleMenu} href="javascript:;">Menu</a>
      </nav>
    </header>
  )
}

Header.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Header
