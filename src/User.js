import React, { useEffect, useState } from "react";
import { trending } from "./request";

export default function User() {
  const [repos, setTrending] = useState([]);
  const [params, setParams] = useState({});

  useEffect(
    () => {
      searchTrending();
    },
    [params]
  );

  async function searchTrending() {
    const result = await trending();
    setTrending(result);
  }
  return (
    <div>
      <button onClick={() => searchTrending()}>Query</button>
      <ul>
        {repos.map(r => (
          <li key={r.name}> {r.name} </li>
        ))}
      </ul>
    </div>
  );
}
