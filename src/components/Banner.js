import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Banner = props => {
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
    <section id="banner" className="major">
      <div className="inner">
        <header className="major">
          <h1>{data.site.siteMetadata.title}</h1>
        </header>
        <div className="content">
          <p>
            Finding creative and community-led ways to tackle housing need in Oxford.          
          </p>
          <ul className="actions">
            <li>
              <a href="#one" name="Get Started" className="button next scrolly">
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Banner

