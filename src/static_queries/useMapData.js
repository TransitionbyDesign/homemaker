import { graphql, useStaticQuery } from "gatsby"

export default function useMapData() {
  const data = useStaticQuery(graphql`
    query getMapData {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              author
              title
              latitude
              longitude
              apposition
              is_published
              hero_image {
                childImageSharp {
                  fluid( maxWidth: 100 ) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt(pruneLength: 200)
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
