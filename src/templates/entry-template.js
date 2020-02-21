import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import "./entry-template.scss";
import "katex/dist/katex.min.css";

export default function Template({ pageContext, data }) {
  const { frontmatter, html } = data.entry;
  const parent = data.parentEntry;
  const { breadcrumbPath } = pageContext;

  const entrySorter = (entry1, entry2) => +(entry1.frontmatter.title > entry2.frontmatter.title);

  console.log(breadcrumbPath);

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <article className="message">
        <div className="message-body" style={{padding: "0.5em 1.5em"}}>
          <nav className="breadcrumb">
            <ul>
              {breadcrumbPath.map(({ id, title_short }) => (
                <li><Link to={"/entry/" + id}>{title_short}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
      <div className="entry-container">
        <div className="entry">
          <div className="columns is-multiline reverse-row-order">
            <div className="column entry-body content">
              <h1>{frontmatter.title}</h1>
              <div
                className="entry-content content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
            <div className="column is-full-tablet is-one-third-desktop">
              <aside className="menu">
                {
                  !!parent &&
                  <>
                    <p className="menu-label">Parent entry</p>
                    <ul className="menu-list">
                      <li>
                        <Link to={"/entry/" + parent.frontmatter.id}>{parent.frontmatter.title}</Link>
                      </li>
                    </ul>
                  </>
                }
                {
                  data.relatedEntries.edges.length > 0 &&
                  <>
                    <p className="menu-label">
                      Related Entries
                    </p>
                    <ul className="menu-list">
                      {data.relatedEntries.edges
                        .map(({ node }) => node)
                        .sort(entrySorter)
                        .map(({ frontmatter }) => (
                          <li key={frontmatter.id}>
                            <Link to={"/entry/" + frontmatter.id}>{frontmatter.title}</Link>
                          </li>
                        ))}
                    </ul>
                  </>
                }
                {
                  !!parent && data.siblingEntries.edges.length > 0 &&
                  <>
                    <p className="menu-label">
                      Sibling Entries
                    </p>
                    <ul className="menu-list">
                      {data.siblingEntries.edges
                        .map(({ node }) => node)
                        .sort(entrySorter)
                        .map(({ frontmatter }) => (
                          <li key={frontmatter.id}>
                            <Link to={"/entry/" + frontmatter.id}>{frontmatter.title}</Link>
                          </li>
                        ))}
                    </ul>
                  </>
                }
                {
                  data.childrenEntries.edges.length > 0 &&
                  <>
                    <p className="menu-label">Children Entries</p>
                    <ul className="menu-list">
                      {data.childrenEntries.edges
                        .map(({ node }) => node)
                        .sort(entrySorter)
                        .map(({ frontmatter }) => (
                          <li key={frontmatter.id}>
                            <Link to={"/entry/" + frontmatter.id}>{frontmatter.title}</Link>
                          </li>
                        ))}
                    </ul>
                  </>
                }
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!, $parentId: String, $related: [String]) {
    entry: markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        title
        related
      }
    }
    
    childrenEntries: allMarkdownRemark(filter: {frontmatter: {parent: {eq: $id}}}) {
      edges {
        node {
          frontmatter {
            title
            id
          }
        }
      }
    }
    
    relatedEntries: allMarkdownRemark(filter: {frontmatter: {id: {in: $related}}}) {
      edges {
        node {
          frontmatter {
            title
            id
          }
        }
      }
    }
    
    siblingEntries: allMarkdownRemark(filter: {frontmatter: {parent: {eq: $parentId}, id: {ne: $id}}}) {
      edges {
        node {
          frontmatter {
            title
            id
          }
        }
      }
    }
    
    parentEntry: markdownRemark(frontmatter: { id: { eq: $parentId } }) {
      html
      frontmatter {
        id
        title
      }
    }
  }
`;