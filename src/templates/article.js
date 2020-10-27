import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import articleTemplateStyles from "../styles/templates/article.module.scss"
import { useLocation } from '@reach/router'
import ModalPage from '../components/ModalPage'
import splashStyles from '../styles/components/splash.module.scss';
import SocialLink from "../components/SocialLink"
import twitterIcon from "../icons/social_icon_twitter.svg"
import linkedInIcon from "../icons/social_icon_linkedin.svg"
import facebookIcon from "../icons/social_icon_facebook.svg"
import cn from 'classnames';
//this component handles the blur img & fade-ins
import Img from 'gatsby-image'

export default (props) => {
  // Ensure that whatever happens, the modal state flag is set
  // This ensures the pages and layouts are correct.
  const location = useLocation();
  location.state = { ...location.state = {}, modal: true };

  // This gets the data passed to the template
  const data = props.data.markdownRemark
  
  return (
    <ModalPage
      header={data.frontmatter.title}
      footer={
        <>
          <Link to="/map" className={splashStyles.button}>BACK TO MAP</Link>
          {/*<SocialLink to={`mailto:${infoData.contact.email}`}
              logo={}
              >
              Email: {infoData.contact.email}
              </SocialLink>*/}
          <div className={splashStyles.linkIcons}>
            <SocialLink to={`https://twitter.com/`}
              logo={twitterIcon} alt="Twitter"
            >
              Twitter: @infoData.contact.twitter_handle
            </SocialLink>
            <SocialLink to={`https://facebook.com/`}
              logo={facebookIcon} alt="Facebook"
            >
              Facebook: @infoData.contact.twitter_handle
            </SocialLink>
            <SocialLink to={`https://linkedin.com/`}
              logo={linkedInIcon} alt="Linked In"
            >
              Linked In: infoData.contact.github_handle
            </SocialLink>
          </div>
        </>
      }>
      <article>
        <div className={articleTemplateStyles.article__info}>
          <h1>{data.frontmatter.title}</h1>
          <h3>{data.frontmatter.date}</h3>
        </div>
        <div className={cn(articleTemplateStyles.article__body, articleTemplateStyles.heroImage)}>
          <p>
            <Img
              fluid={data.frontmatter.hero_image.childImageSharp.fluid}
              alt={data.frontmatter.title}
            />
          </p>
        </div>
        {
          !data.frontmatter.video_url? '' :
          <div
            className={articleTemplateStyles.article__body}>
            <video controls width="100%">

              <source src={data.frontmatter.video_url}/>
                  Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
        }
        {
          !data.frontmatter.audio_url? '' :
          <div
            className={articleTemplateStyles.article__body}>
            <audio
              controls
              src={data.frontmatter.audio_url}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </div>
        }
        <div
          className={articleTemplateStyles.article__body}
          dangerouslySetInnerHTML={{ __html: data.html }}
        ></div>
        <div className={articleTemplateStyles.article__footer}>
          <h2>
            Written By: {data.frontmatter.author}
          </h2>
        </div>
      </article>      
    </ModalPage>
  )
}

// Dynamic page query, must occur within each post context/
//
// $slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        media
      }
      frontmatter {
        title
        author
        date(formatString: "MMMM Do, YYYY")
        audio_url
        video_url
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`
