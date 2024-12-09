import React from "react";

const QuoteCard = React.memo(({ quote }) => {
  return (
    <div className="quote-card">
      <p className="quote">"{quote.quote}"</p>
      <p className="author">- {quote.author}</p>
    </div>
  );
});

export default QuoteCard;
