import React from "react"
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import Layout from "../components/Layout"
import Splash from "../components/Splash"
import SocialLink from "../components/SocialLink"
import windowStyles from "../styles/components/window.module.scss"
import mapLayoutStyles from "../styles/components/mapLayout.module.scss"
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
    <Layout className={mapLayoutStyles.layout} eventPassThru>
      <div className={cn(mapLayoutStyles.overlay, mapLayoutStyles.welcome)}>
        <Splash
          className={windowStyles.welcome}
          header={welcomeData.header}
          footer={
            <div className={cn(windowStyles.col, windowStyles.footer)}>
              <div className={cn(windowStyles.row, windowStyles.center)}>
                <h3 className={windowStyles.strapline}>
                  Homemaker Oxford, finding creative ways to fight the housing crisis.
                </h3>
              </div>
              { !welcomeData.is_published? <div className={cn(windowStyles.introButtons, windowStyles.row)}/> :
                <div className={cn(windowStyles.introButtons, windowStyles.row, windowStyles.center)}>
                  <Link to="/map" className={windowStyles.button}>EXPLORE THE MAP</Link>
                </div>
              }
              <div className={cn(windowStyles.row, windowStyles.links)}>
                <div/>
                {/*<SocialLink to={`mailto:${welcomeData.contact.email}`}
                    logo={}
                    >
                    Email: {welcomeData.contact.email}
                    </SocialLink>*/}
                <div className={windowStyles.linkIcons}>
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
              </div>
            </div>
          }
    >
    <div dangerouslySetInnerHTML={{__html: welcomeData.intro}}/>
    <div
      className={cn(windowStyles.columned)}
      dangerouslySetInnerHTML={{__html: welcomeData.text}} />
        </Splash>
      </div>
    </Layout>
  )
}
