import { graphql, useStaticQuery } from "gatsby"

export default function useMapData() {
  const data = useStaticQuery(graphql`
    query getMapData {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              latitude
              longitude
              audio_url
              video_url
              geojson
              apposition
              is_published
              hero_image {
                childImageSharp {
                  fluid( maxWidth: 288 ) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt(pruneLength: 150)
            fields {
              slug
              media
            }
          }
        }
      }
    }
  `)
  return data.allMarkdownRemark.edges
}
