import React from "react";
const Highlighter = ({ item }) => {
  const getHighlightColor = (length) => {
    if (length <= 5) return "#ACE986";
    if (length <= 18) return "#FFEA79";
    return "#FFB3B3";
  };
  const getTextColor = (length) => {
    if (length <= 5) return "#1A5D1A";
    if (length <= 18) return "#DE8601";
    return "#9A2617";
  };
  return (
    <div className="text-sm text-justify px-2 mt-2">
      {item.sentences.map((sentence) => (
        <span
          key={sentence.id}
          className="text-xs"
          style={{
            backgroundColor: getHighlightColor(
              sentence.sentence.split(/\s+/).length
            ),
            color: getTextColor(sentence.sentence.split(/\s+/).length),
            fontWeight: 600,
            letterSpacing: "0.025em",
          }}
        >
          {" "}
          {sentence.sentence}.
        </span>
      ))}
    </div>
  );
};

export default Highlighter;
