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

const url = (location) => encodeURIComponent(location.href)

const tweetLink = (title, path) => [
  `https://twitter.com/intent/tweet`,
  `?text=`, encodeURIComponent(title),
  `&url=`, url(path),
  `&via=transitionbydesign&hashtags=HomemakerOxford`,
].join('')

const facebookLink = (path) => [
  `https://www.facebook.com/sharer/sharer.php`,
  `?u=`, url(path), 
].join('')

const linkedInLink = (title, path) => [
  `https://www.linkedin.com/shareArticle`,
  `?mini=true&url=`, url(path),
  `&title=`, encodeURIComponent(title),
  `&source=`, encodeURIComponent(title),
].join('')

export default (props) => {
  // Ensure that whatever happens, the modal state flag is set
  // This ensures the pages and layouts are correct.
  const location = useLocation();
  location.state = { ...location.state = {}, modal: true };

  // This gets the data passed to the template
  const data = props.data.markdownRemark

  return (
    <ModalPage
      className={splashStyles[data.frontmatter.apposition]}
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
          <SocialLink to={tweetLink(data.frontmatter.title, location)}
            logo={twitterIcon} alt="Twitter"
            title="Click to tweet"
          >
            Click to Share
          </SocialLink>
          <SocialLink to={facebookLink(location)}
            logo={facebookIcon} alt="Facebook"
            title="Click to post on Facebook"
          >
            Click to Share
          </SocialLink>
          <SocialLink to={linkedInLink(data.frontmatter.title, location)}
            logo={linkedInIcon} alt="Linked In"
            title="Click to post on LinkedIn"
          >
            Click to Share
          </SocialLink>
        </div>
        </>
      }>
    <article>
      <div className={articleTemplateStyles.info}>
        <h1>{data.frontmatter.title}</h1>
        <h3>{data.frontmatter.date}</h3>
      </div>
      {
        !data.frontmatter.hero_image? '' :
        <div className={cn(articleTemplateStyles.body, articleTemplateStyles.heroImage)}>
          <p>
            <Img
              fluid={data.frontmatter.hero_image.childImageSharp.fluid}
              alt={data.frontmatter.title}
            />
          </p>
        </div>
      }
      {
        !data.frontmatter.video_url? '' :
        <div
          className={articleTemplateStyles.video}>
          <video controls width="100%">
            <source src={data.frontmatter.video_url+'#t=0.0001'}/>
              Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      }
    {
        !data.frontmatter.audio_url? '' :
        <div
          className={articleTemplateStyles.audio}>
          <audio
            controls
            src={data.frontmatter.audio_url}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      }
      <div
        className={articleTemplateStyles.body}
        dangerouslySetInnerHTML={{ __html: data.html }}
      ></div>
      <div className={articleTemplateStyles.footer}>
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
        apposition
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
