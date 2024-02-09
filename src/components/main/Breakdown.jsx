import React from "react";
const Breakdown = ({ item, isBreakdownVisible }) => {
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
    <div className={`breakdownWrapper ${isBreakdownVisible ? "show" : "hide"}`}>
      <div className="breakdown">
        {item.sentences.map((sentence) => (
          <div
            key={sentence.id}
            className="text-xs"
            style={{
              backgroundColor: getHighlightColor(
                sentence.sentence.split(/\s+/).length
              ),
              color: getTextColor(sentence.sentence.split(/\s+/).length),
              padding: "0.5rem",
              borderRadius: "0.2rem",
              fontWeight: 600,
              letterSpacing: "0.025em",
            }}
          >
            {sentence.sentence}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breakdown;
