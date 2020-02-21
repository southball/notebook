/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const entryTemplate = path.resolve(`src/templates/entry-template.js`);
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              id
              related
              parent
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path: "/entry/" + node.frontmatter.id,
      component: entryTemplate,
      context: {
        id: node.frontmatter.id,
        related: node.frontmatter.related || [],
        parentId: node.frontmatter.parent,
      },
    });
  });
};
