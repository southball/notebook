import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="content">
      <h1>404 Page Not Found</h1>
      <p>The page you are trying to access is not found.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
