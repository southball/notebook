import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

const NavBar = () => {
  const [toggled, setToggled] = useState(false);

  const {site} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <nav className="navbar is-fixed-top" style={{boxShadow: "0 2px 0 0 #f5f5f5"}}>
      <div className="navbar-brand">
        <Link className="navbar-item">
          <b>{site.siteMetadata.title}</b>
        </Link>

        <a role="button"
           className={"navbar-burger burger " + (toggled ? "is-active" : "")}
           onClick={() => setToggled(!toggled)}>
          <span />
          <span />
          <span />
        </a>
      </div>

      <div className={"navbar-menu " + (toggled ? "is-active" : "")}>
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Index
          </Link>
        </div>
      </div>
    </nav>
  )
};

export default NavBar;
