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
  // `Frontmatter` as in some of the docs). We define some other fields
  // which can be optional so as to avoid errors if Gatsby does not
  // find any examples and therefore can't infer their existence.
  // Note well: any File fields are an exception, as I've not
  // discovered how to define these correctly. (Simply specifying, e.g.
  // `hero_image: File` does not work.) I suspect a bug in Gatsby.
  // I find myself caught between errors related to File fields being objects,
  // which need at least one subfield in the query, and errors related to
  // the fields being interpreted as strings, which cannot have subfields,
  // or simply being missing. I also get "Cannot read property 'contentDigest'
  // of undefined` for publicURL", as in this thread:
  //
  // https://spectrum.chat/gatsby-js/general/cannot-read-property-contentdigest-of-undefined-for-publicurl~b3f62193-936b-4b84-acea-66a6f4f4876f
  //
  // Overall, *not* declaring image/file fields expicitly and allowing Gatsby
  // to infer them seems to work least badly, at least for now. I do worry that
  // this is fragile, however, I don't seem to have a lot of choice, as I don't have
  // the time to write a full bug report for the Gatsby project and/or experiment further.
  //
  // [later] Indeed it is fragile.
  // I believe that the order in which gatsby encounters the articles
  // changes the outcome (success, or one of various errors) by changing
  // the way it infers the fields - sometimes inferring a string and sometimes
  // inferring a File. This may be a consequence of custom_icon and
  // hero_image being optional, I think, and therefore not consistently a file.
  //  
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      title: String!
      summary: String @md
      apposition: String
      youtube_url: String
      latitude: Float
      longitude: Float
      region: String
      is_published: Boolean
      legend_text: String @md
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
    console.log("processing:", edge.node.fields.slug);
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
