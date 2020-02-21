import React from "react";
import PropTypes from "prop-types";

import './layout.scss';
import NavBar from "./navbar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="container" style={{padding: "1rem 1rem"}}>
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
