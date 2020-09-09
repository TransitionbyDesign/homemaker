import React from 'react'
import Helmet from 'react-helmet'
import pic01 from 'gatsby-theme-forty/src/assets/images/pic01.jpg'
import pic02 from 'gatsby-theme-forty/src/assets/images/pic02.jpg'
import pic03 from 'gatsby-theme-forty/src/assets/images/pic03.jpg'
import pic04 from 'gatsby-theme-forty/src/assets/images/pic04.jpg'
import pic05 from 'gatsby-theme-forty/src/assets/images/pic05.jpg'
import pic06 from 'gatsby-theme-forty/src/assets/images/pic06.jpg'
import Banner from '../components/Banner'
import Layout from '../components/layout'
import { Link, graphql } from 'gatsby'

class HomeIndex extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <Layout>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.title },
            { name: 'keywords', content: data.sitePlugin.packageJson.keywords },
          ]}
        ></Helmet>

        <Banner />

        <div id="main">
          <section id="one" className="tiles">
            <article style={{ backgroundImage: `url(${pic01})` }}>
              <Link
                aria-label="Link to Map Demo 1"
                to="/map1"
                className="link primary"
              >
                <header className="major">
                  <h3>Map Demo 1</h3>
                  <p>Pins and paths</p>
                </header>
              </Link>
            </article>
            <article style={{ backgroundImage: `url(${pic02})` }}>
              <Link
                aria-label="Link to Video Demo 1"
                to="/video1"
                className="link primary"
              >
                <header className="major">
                  <h3>Video Demo 1</h3>
                  <p>Community Land Trusts</p>
                </header>
              </Link>
            </article>
            <article style={{ backgroundImage: `url(${pic03})` }}>
              <Link
                aria-label="Link to Landing Page"
                to="/landing"
                className="link primary"
              >
                <header className="major">
                  <h3>Magna</h3>
                  <p>Lorem etiam nullam</p>
                </header>
              </Link>
            </article>
            <article style={{ backgroundImage: `url(${pic04})` }}>
              <Link
                aria-label="Link to Landing Page"
                to="/landing"
                className="link primary"
              >
                <header className="major">
                  <h3>Ipsum</h3>
                  <p>Nisl sed aliquam</p>
                </header>
              </Link>
            </article>
            <article style={{ backgroundImage: `url(${pic05})` }}>
              <Link
                aria-label="Link to Landing Page"
                to="/landing"
                className="link primary"
              >
                <header className="major">
                  <h3>Consequat</h3>
                  <p>Ipsum dolor sit amet</p>
                </header>
              </Link>
            </article>
            <article style={{ backgroundImage: `url(${pic06})` }}>
              <Link
                aria-label="Link to Landing Page"
                to="/landing"
                className="link primary"
              >
                <header className="major">
                  <h3>Etiam</h3>
                  <p>Feugiat amet tempus</p>
                </header>
              </Link>
            </article>
          </section>
          <section id="two">
            <div className="inner">
              <header className="major">
                <h2>Massa libero</h2>
              </header>
              <p>
                Nullam et orci eu lorem consequat tincidunt vivamus et sagittis
                libero. Mauris aliquet magna magna sed nunc rhoncus pharetra.
                Pellentesque condimentum sem. In efficitur ligula tate urna.
                Maecenas laoreet massa vel lacinia pellentesque lorem ipsum
                dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et
                sagittis libero. Mauris aliquet magna magna sed nunc rhoncus
                amet pharetra et feugiat tempus.
              </p>
              <ul className="actions">
                <li>
                  <Link
                    aria-label="Link to Landing Page"
                    to="/landing"
                    className="button next"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default HomeIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    sitePlugin {
      packageJson {
        keywords
      }
    }
  }
`
