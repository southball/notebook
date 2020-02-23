import React, { useState } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import "./index.scss";

const Node = ({ node, children, nesting }) => {
  const [showSubtree, setShowSubtree] = useState(nesting <= 2);

  return (
    <li className="node">
      <a
        className="bullet-point"
        style={{fontFamily: "Consolas"}}
        onClick={() => setShowSubtree(!showSubtree)}
      >
        {children.length > 0 ? (showSubtree ? '-' : '+') : <>&nbsp;</>}
      </a>
      <Link to={"/entry/" + node.frontmatter.id}>
        {node.frontmatter.title}
      </Link>
      {children.length > 0 && showSubtree && (
        <ul className="node-children">
          {children.map((child) => (
            <Node node={child.node} children={child.children} nesting={nesting + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const fix = (f) => f.bind(null, f);

const generateTrees = (entries) => {
  const childrens = new Map(
    entries.map((node) => [node.frontmatter.id, []]));

  entries
    .forEach((node) => {
      const list = childrens.get(node.frontmatter.parent) || [];
      list.push(node);
    });

  const dfs = fix((f, node) => ({
    node,
    children: childrens.get(node.frontmatter.id).map((child) => f(f, child)),
  }));

  const trees = entries
    .filter((node) => !node.frontmatter.parent)
    .map((node) => dfs(node));

  return trees;
};

const IndexPage = ({ data }) => {
  const entries = data.entries.edges.map(({ node }) => node);
  const trees = generateTrees(entries);
  console.log(trees);

  return (
    <Layout>
      <SEO title="Home" />
      <div className="content">
        <h1>Entries List</h1>
        <ul>
          {trees.map(({ node, children }) =>
            <Node node={node} children={children} nesting={1} />)}
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
            title_short
            id
            parent
          }
        }
      }
    }
  }
`;

export default IndexPage;
