const path = require("path")
const remark = require(`remark`)
const html = require(`remark-html`)

// Adapted from https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#createresolvers-api
exports.createSchemaCustomization = ({ actions }) => {
  // Define the @md tag to mark a field which should be interpreted as markdown
  // and converted to HTML
  actions.createFieldExtension({
    name: "md",
    args: {
      sanitize: {
        type: "Boolean!",
        defaultValue: true,
      },
    },
    // The extension `args` (above) are passed to `extend` as
    // the first argument (`options` below)
    extend(options, prevFieldConfig) {
      return {
        args: {
          sanitize: "Boolean",
        },
        resolve(source, args, context, info) {
          const fieldValue = context.defaultFieldResolver(
            source,
            args,
            context,
            info
          )
          const shouldSanitize =
            args.sanitize != null ? args.sanitize : options.sanitize
          const processor = remark().use(html, { sanitize: shouldSanitize })
          return processor.processSync(fieldValue).contents
        },
      }
    },
  })


  // Add a type definition for this field which marks
  // `summary` as a markdown field. Note, `MarkdownRemarkFrontmatter`
  // is empirically the type name of frontmatter objects (and not
  // `Frontmatter` as in some of the docs)
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
     summary: String! @md
     footer_text: String! @md
    }
  `)
}

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
            frontmatter {
              is_published
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
    if (!edge.node.frontmatter.is_published)
      return;
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
