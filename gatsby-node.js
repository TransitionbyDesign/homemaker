/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


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

// Build pages from markdown
const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            parent {
              ... on File {
                relativePath
              }
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const filePath = path.parse(node.parent.relativePath);
    const pagePath = path.format({dir: filePath.dir,
                                  name: filePath.name,
                                  ext: '.html'});
    createPage({
      path: pagePath,
      component: path.resolve(`src/templates/post.js`),
      context: { id: node.id },
    });
  })
}
