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
              title
              title_short
            }
          }
        }
      }
    }
  `);

  const nodes = result.data.allMarkdownRemark.edges.map(({node}) => node);
  const nodeMap = new Map();

  for (const node of nodes) {
    nodeMap.set(node.frontmatter.id, node);
  }

  for (const node of nodes) {
    const breadcrumbPath = [{
      id: node.frontmatter.id,
      title_short: node.frontmatter.title_short || node.frontmatter.title,
      title: node.frontmatter.title,
      parent: node.frontmatter.parent,
    }];
    while (true) {
      const last = breadcrumbPath[breadcrumbPath.length - 1];
      const parentNode = nodeMap.get(last.parent);
      if (!parentNode)
        break;
      breadcrumbPath.push({
        id: parentNode.frontmatter.id,
        title_short: parentNode.frontmatter.title_short || parentNode.frontmatter.title,
        title: parentNode.frontmatter.title,
        parent: parentNode.frontmatter.parent,
      });
    }
    node.breadcrumbPath = breadcrumbPath.reverse();
  }

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  console.log(nodes);
  nodes.forEach((node) => {
    createPage({
      path: "/entry/" + node.frontmatter.id,
      component: entryTemplate,
      context: {
        id: node.frontmatter.id,
        related: node.frontmatter.related || [],
        parentId: node.frontmatter.parent,
        breadcrumbPath: node.breadcrumbPath,
      },
    });
  });
};
