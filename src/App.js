import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import QuoteList from "./components/QuoteList";
import "./App.css";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const fetchQuotes = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const data = await response.json();

      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prevQuotes) => [...prevQuotes, ...data.data]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }, [page]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      <h1>Quotes</h1>
      {error && <p className="error">{error}</p>}
      <InfiniteScroll
        dataLength={quotes.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: "center" }}>You have seen all the quotes!</p>}
      >
        <QuoteList quotes={quotes} />
      </InfiniteScroll>
    </div>
  );
};

export default App;
