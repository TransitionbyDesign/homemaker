import { graphql, useStaticQuery } from "gatsby"

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query getMetadata {
      site {
        siteMetadata {
          title
          description
          repoUrl
          welcomeData {
            header
            intro
            text
            is_published
            contact {
              address
              email
              phone_number
              twitter_handle
              linkedin_profile
              facebook_id
            }
          }
        }
      }
    }
  `)
  return data.site.siteMetadata
}
