import React from "react";
import QuoteCard from "./QuoteCard";

const QuoteList = React.memo(({ quotes }) => {
  return (
    <div>
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </div>
  );
});

export default QuoteList;
