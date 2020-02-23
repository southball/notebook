import React, { useEffect, useState } from "react";
import {Link} from "gatsby";

const Search = ({ show, setShow }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);

  function search(query) {
    if (!query || !window.__LUNR__) return [];
    const lunr = window.__LUNR__.en;
    const rawResult = lunr.index.search(query);
    const refMap = new Map();
    for (const [key, value] of Object.entries(lunr.store)) {
      refMap.set(value.id, value);
    }
    const result = rawResult.map(({ref}) => refMap.get(ref));
    return result;
  }

  useEffect(() => {
    try {
      const result = search(searchQuery);
      setResult(result);
    } catch(e) {}
  }, [searchQuery]);

  return (
    show ? (
      <div className="quickview is-active">
        <header className="quickview-header">
          <p className="title">Search</p>
          <span className="delete" onClick={() => setShow(false)} />
        </header>

        <div className="quickview-body">
          <div className="quickview-block">
            <nav className="panel">
              <div className="panel-block">
                <input
                  type="text"
                  className="input"
                  placeholder="Search Query"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              {result.map((entry) => (
                <div className="panel-block">
                  <Link to={"/entry/" + entry.id}>{entry.title}</Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    ) : <></>
  );
};

export default Search;