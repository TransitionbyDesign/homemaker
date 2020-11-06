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
              summary
              apposition
              hero_image {
                childImageSharp {
                  fluid( maxWidth: 288 ) {
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
