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
  const { welcomeData } = useSiteMetaData()
  
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
              <Link to="/map" className={splashStyles.button}>EXPLORE THE MAP</Link>
              
              {/*<SocialLink to={`mailto:${welcomeData.contact.email}`}
                  logo={}
                  >
                  Email: {welcomeData.contact.email}
                  </SocialLink>*/}
              <div className={splashStyles.linkIcons}>
                <SocialLink to={`https://twitter.com/${welcomeData.contact.twitter_handle}`}
                  logo={twitterIcon} alt="Twitter"
                >
                  Twitter: @{welcomeData.contact.twitter_handle}
                </SocialLink>
                <SocialLink to={`https://facebook.com/${welcomeData.contact.facebook_id}`}
                  logo={facebookIcon} alt="Facebook"
                >
                  Facebook: @{welcomeData.contact.facebook_id}
                </SocialLink>
                <SocialLink to={`https://www.linkedin.com/company/${welcomeData.contact.linkedin_profile}`}
                  logo={linkedInIcon} alt="LinkedIn"
                >
                  LinkedIn: {welcomeData.contact.linkedin_profile}
                </SocialLink>
              </div>
            </>
          }
        >
          <h1>{welcomeData.welcome_title}</h1>
          
          <div
            className={splashStyles.columned}
            dangerouslySetInnerHTML={{__html: welcomeData.welcome_text}} />         
        </Splash>
      </div>
    </Layout>
  )
}
