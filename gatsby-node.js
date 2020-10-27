const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const components = path.parse(node.fileAbsolutePath)
    createNodeField({
      node,
      name: "slug",
      value: components.name,
    })
    createNodeField({
      node,
      name: "media",
      value: path.parse(components.dir).name,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Dynamically create pages here
  
  // Get node data
  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Get path to template
  const template = path.resolve("./src/templates/article.js");
  
  // Create new pages with unique slug
  response.data.allMarkdownRemark.edges.forEach(edge => {
    const fields = edge.node.fields;
    createPage({
      component: template,
      path: `/map/${fields.slug}`,
      context: {
        slug: fields.slug,
      },
    })
  })
}


// Tell webpack to ignore emacs lock files (else it crashes!)
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    devServer: {
      watchOptions: {
        ignored: /\.#|node_modules|~$/,
      },
    }
  })
};
