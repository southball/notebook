import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function Template({ pageContext, data }) {
  console.log(data, pageContext);
  const { frontmatter, html } = data.entry;
  const parent = data.parentEntry;
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div className="entry-container">
        <div className="entry content">
          <h1>{frontmatter.title}</h1>
          {
            parent
              ? <p>
                Parent:&nbsp;
                <Link to={"/entry/" + parent.frontmatter.id}>{parent.frontmatter.title}</Link>
              </p>
              : <></>
          }
          <div
            className="entry-content content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {
            data.relatedEntries.edges.length
              ? <>
                <h2>Related Concepts</h2>
                <ul>
                  {data.relatedEntries.edges.map(({ node: { frontmatter } }) => (
                    <li key={frontmatter.id}>
                      <Link to={"/entry/" + frontmatter.id}>{frontmatter.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
              : <></>
          }
          {
            data.childrenEntries.edges.length
              ? <>
                <h2>Children Concepts</h2>
                <ul>
                  {data.childrenEntries.edges.map(({ node: { frontmatter }}) => (
                    <li key={frontmatter.id}>
                    <Link to={"/entry/" + frontmatter.id}>{frontmatter.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
              : <></>
          }
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
    
    parentEntry: markdownRemark(frontmatter: { id: { eq: $parentId } }) {
      html
      frontmatter {
        id
        title
      }
    }
  }
`;