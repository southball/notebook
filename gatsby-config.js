module.exports = {
  pathPrefix: "/notebook",
  siteMetadata: {
    title: `My Notebook`,
    description: `Things to remember, hierarchically.`,
    author: `@southball02`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/notebook`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [{
          name: 'en',
          filterNodes: (node) => true,
        }],
        fields: [
          {name: 'title', store: true, attributes: {boost: 20}},
          {name: 'title_short', store: true},
          {name: 'id', store: true},
          {name: 'content', store: true},
        ],
        resolvers: {
          MarkdownRemark: {
            title: (node) => node.frontmatter.title,
            title_short: (node) => node.frontmatter.title_short,
            id: (node) => node.frontmatter.id,
            content: (node) => node.rawMarkdownBody,
          }
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
