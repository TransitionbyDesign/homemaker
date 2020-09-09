import React from 'react';
//import { Link } from "gatsby";
import Layout from "../components/layout";
//import SEO from "../components/seo";
import Helmet from 'react-helmet';
import Video from "../components/Video";
import { graphql } from 'gatsby';

class PageVideo1 extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <Layout>
        <Helmet
          title={"Video Demo 1"+data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.title },
            /*{ name: 'keywords', content: data.sitePlugin.packageJson.keywords },*/
          ]}/>


        <div id="main" className="alt">
          <section id="one">
            <div className="inner">
              <header className="major">
                <h1>Video Demo 1</h1>
              </header>
              <span className="image main">
                <Video ratio="1.77" 
		              videoSrcURL="https://www.youtube.com/embed/U3-EOOStzto"
		              videoTitle="Community Land Trusts"
                />
              </span>
              <p>
		            P-O-C: embeding a video. This one's off the T-b-D website,
		            and is about Community Land Trusts.
	            </p>
            </div>
          </section>
        </div>

      </Layout>	  
    )
  }
}


export default PageVideo1

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
