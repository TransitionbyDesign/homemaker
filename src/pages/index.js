import React from "react"
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import Layout from "../components/Layout"
import Splash from "../components/Splash"
import SocialLink from "../components/SocialLink"
import splashStyles from "../styles/components/splash.module.scss"
import mapLayoutStyles from "../styles/components/mapLayout.module.scss"
import landingStyles from "../styles/pages/landing.module.scss"
import useSiteMetaData from "../static_queries/useSiteMetadata"
import cn from "classnames"
import twitterIcon from "../icons/social_icon_twitter.svg"
import linkedInIcon from "../icons/social_icon_linkedin.svg"
import facebookIcon from "../icons/social_icon_facebook.svg"


export default () => {
  const { infoData } = useSiteMetaData()
  
  // Ensure that whatever happens, the modal state flag is set
  // This ensures the pages and layouts are correct.
  const location = useLocation();
  location.state = { ...location.state = {}, modal: true };
  return (
    <Layout className={mapLayoutStyles.layout}>
      <div className={mapLayoutStyles.overlay}>
        <Splash
          header="Welcome"
          footer={
            <>
              {/*<SocialLink to={`mailto:${infoData.contact.email}`}
                  logo={}
                  >
                  Email: {infoData.contact.email}
                  </SocialLink>*/}
              <div className={splashStyles.linkIcons}>
                <SocialLink to={`https://twitter.com/${infoData.contact.twitter_handle}`}
                  logo={twitterIcon} alt="Twitter"
                >
                  Twitter: @{infoData.contact.twitter_handle}
                </SocialLink>
                <SocialLink to={`https://facebook.com/${infoData.contact.facebook_id}`}
                  logo={facebookIcon} alt="Facebook"
                >
                  Facebook: @{infoData.contact.twitter_handle}
                </SocialLink>
                <SocialLink to={`https://github.com/infoData.contact.linkedin`}
                  logo={linkedInIcon} alt="Linked In"
                >
                  Linked In: {infoData.contact.github_handle}
                </SocialLink>
              </div>
            </>
          }
        >
          <h1>{infoData.welcome_title}</h1>
          
          <div
            className={splashStyles.columned}
            dangerouslySetInnerHTML={{__html: infoData.welcome_text}} />

          
          <Link to="/map" className={splashStyles.button}>EXPLORE THE MAP</Link>
          
        </Splash>
      </div>
    </Layout>
  )
}
