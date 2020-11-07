import React from "react"
import { graphql, Link } from "gatsby"
import articleTemplateStyles from "../styles/templates/article.module.scss"
import { useLocation } from '@reach/router'
import ModalPage from '../components/ModalPage'
import windowStyles from '../styles/components/window.module.scss';
import SocialLink from "../components/SocialLink"
import twitterIcon from "../icons/social_icon_twitter.svg"
import linkedInIcon from "../icons/social_icon_linkedin.svg"
import facebookIcon from "../icons/social_icon_facebook.svg"
import cn from 'classnames';
//this component handles the blur img & fade-ins
import Img from 'gatsby-image'

// Replaces substrings matching `${ ... }` with the URI-encoded value
// of the equivalent property of `data` (which should be an object)
// or '' if there is none.
function createLink(template, data) {
  return template.replace(/\$\{(.*?)\}/g, (match, capture) => (
    (capture in data)? encodeURIComponent(data[capture]) : ''
  ))
}

const linkTemplates = {
  twitter: "https://twitter.com/intent/tweet"+
           "?text=\${title}"+
           "&url=\${url}"+
           "&via=transitionbydesign&hashtags=HomemakerOxford",
  facebook: "https://www.facebook.com/sharer/sharer.php"+
            "?u=\${url}",
  linkedin: "https://www.linkedin.com/shareArticle"+
            "?mini=true&url=\${url}"+
            "&title=\${title}"+
            "&source=\${title}",
}

export default (props) => {
  // Ensure that whatever happens, the modal state flag is set
  // This ensures the pages and layouts are correct.
  const location = useLocation();
  location.state = { ...location.state = {}, modal: true };
    
  // This gets the data passed to the template
  const data = props.data.markdownRemark
  const youtube = data.frontmatter.youtube_url
  const title = data.frontmatter.title
  const linkParams = {
    title,
    url: location.href,
  }  

  return (
    <ModalPage
      className={data.frontmatter.apposition}
      header={title}
      footer={
        <>
          <Link to="/map" className={windowStyles.button}>BACK TO MAP</Link>
          <div className={windowStyles.linkIcons}>
            <SocialLink to={createLink(linkTemplates.twitter, linkParams)}
              logo={twitterIcon} alt="Twitter"
              title="Click to tweet"
            >
              Click to Share
            </SocialLink>
            <SocialLink to={createLink(linkTemplates.facebook, linkParams)}
              logo={facebookIcon} alt="Facebook"
              title="Click to post on Facebook"
            >
              Click to Share
            </SocialLink>
            <SocialLink to={createLink(linkTemplates.linkedin, linkParams)}
              logo={linkedInIcon} alt="Linked In"
              title="Click to post on LinkedIn"
            >
              Click to Share
            </SocialLink>
          </div>
        </>
      }>
      <div className={articleTemplateStyles.wrapper}>
        <div className={articleTemplateStyles.left}>
          <div
            className={articleTemplateStyles.body}
            dangerouslySetInnerHTML={{ __html: data.html }}
          ></div>
        </div>
        <div className={articleTemplateStyles.right}>
          {
            (youtube || !data.frontmatter.hero_image)? '' :
            <div className={cn(articleTemplateStyles.hero)}>
              <Img
                fluid={data.frontmatter.hero_image.childImageSharp.fluid}
                alt={title}
              />
            </div>
          }
          {
            !youtube? '' :
            <div className={windowStyles.youtube}>
              <iframe className={windowStyles.aspectRatio} src={youtube}
                frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen title={title}>
              </iframe>
            </div>
          }
        </div>
      </div>
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
        apposition
        hero_image {
          childImageSharp {
            fluid( maxWidth: 1500 ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        youtube_url
        latitude
        longitude
	      region
        is_published
      }
      html
    }
  }
`
