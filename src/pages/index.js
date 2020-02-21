import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  const { entries } = data;

  return (
    <Layout>
      <SEO title="Home" />
      <div className="content">
        <h1>Entries List</h1>
        <ul>
          {entries.edges.map(({ node }) => (
            <li key={node.frontmatter.id}>
              <Link to={"/entry/" + node.frontmatter.id}>
                {node.frontmatter.title_short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    entries: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            id
          }
        }
      }
    }
  }
`;

export default IndexPage;
