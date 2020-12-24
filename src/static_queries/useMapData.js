import { graphql, useStaticQuery } from "gatsby"

export default function useMapData() {
  const data = useStaticQuery(graphql`
    query getMapData {
      pins: allMarkdownRemark(filter: {frontmatter: {is_published: {eq: true}}}) {
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
      sidebar: markdownRemark(
        fields: {
          slug: {eq: "sidebar"},
          media: {eq: "data"},
        }
      )
      {
        id
        frontmatter {
          title
          footer_text
          button_link
        }
        html
      }
    }
  `)
  return { sidebar: data.sidebar, pins: [ ...data.pins.edges ] }
}
