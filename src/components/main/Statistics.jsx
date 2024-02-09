import React, { useEffect, useState } from "react";
import SentenceLengthChart from "./SentenceLengthChart";
import Breakdown from "./Breakdown";
import Highlighter from "./Highlighter";
import BreakdownLineChart from "./BreakdownLineChart";

const Statistics = ({ data }) => {
  const calculateSentenceRhythm = (sentences) => {
    const rhythm = sentences?.map((sentence) => {
      const wordsCount = sentence.split(/\s+/).length;
      if (wordsCount <= 5) return "S";
      if (wordsCount <= 18) return "M";
      return "L";
    });
    return rhythm.join(",");
  };

  const [isBreakdownVisible, setIsBreakdownVisible] = useState(
    data.map(() => false)
  );

  const [isGraphVisible, setIsGraphVisible] = useState(data.map(() => false));

  const toggleBreakdownVisibility = (index) => {
    const updatedVisibility = [...isBreakdownVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsBreakdownVisible(updatedVisibility);
  };
  const toggleGraphVisibility = (index) => {
    const updatedVisibility = [...isGraphVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsGraphVisible(updatedVisibility);
  };

  // Functions to categorize sentences and calculate word counts
  function categorizeSentences(input, index) {
    const sentencedata = [
      {
        type: "SHORT",
        count: 0,
      },
      {
        type: "MEDIUM",
        count: 0,
      },
      {
        type: "LONG",
        count: 0,
      },
    ];

    function categorizeSentence(sentence) {
      const words = sentence.split(" ");
      const wordCount = words.length;

      if (wordCount <= 5) {
        return "SHORT";
      } else if (wordCount <= 18) {
        return "MEDIUM";
      } else {
        return "LONG";
      }
    }

    input[index].sentences.forEach((sentence) => {
      const category = categorizeSentence(sentence.sentence);
      sentencedata.forEach((item) => {
        if (item.type === category) {
          item.count++;
        }
      });
    });
    return sentencedata;
  }
  function calculateWordCounts(input, index) {
    const breakdowndata = [];
    input[index].sentences.forEach((sentence, index) => {
      const words = sentence.sentence.split(" ").filter((word) => word !== ""); // Split sentence into words and remove empty strings
      breakdowndata.push({ id: index + 1, length: words.length });
    });
    return breakdowndata;
  }

  // Function to transform input data
  function transformInput(inputData) {
    const outputData = inputData?.map((para, paraIndex) => {
      const id = `p${paraIndex + 1}`;
      const sentences = para.sentences
        .filter((sentence) => {
          return (
            sentence.content !== "" &&
            sentence.content !== "." &&
            sentence.content !== " "
          );
        })
        .map((sentence, sentenceIndex) => ({
          id: `${id}s${sentenceIndex + 1}`,
          sentence: sentence.content,
        }));
      return {
        id,
        sentences,
      };
    });

    return outputData;
  }

  const [analyseData, setAnalyseData] = useState([]);

  useEffect(() => {
    console.log(data);
    setAnalyseData(transformInput(data));
  }, []);

  return (
    <div
      id="statistics-wrapper"
      className="bg-gray-50 rounded-lg border-[1px] border-gray-300 overflow-hidden px-3 py-6"
    >
      {data?.length === 0 ? (
        <div className="h-full w-full flex justify-center items-center">
          <div>Empty</div>
        </div>
      ) : (
        <div className="w-full overflow-y-auto h-full hideScroll">
          {analyseData?.map((item, index) => (
            <div className="flex flex-col w-full gap-2" key={item.id}>
              <div className="flex flex-col w-full px-2 items-start justify-center">
                <div className="text-[#0084FF] font-bold text-lg">
                  Paragraph {index + 1}
                </div>
                <div className="text-xs text-gray-500">
                  {item.sentences.length} sentences
                </div>
              </div>
              <Highlighter item={item} />
              <div className="bg-white border-2 border-gray-300 border-opacity-40 cursor-pointer rounded-md px-3 py-2 overflow-hidden">
                <div
                  className="text-sm flex justify-between font-semibold items-center text-[#0084FF]"
                  onClick={() => toggleBreakdownVisibility(index)}
                >
                  <span>Breakdown</span>
                  <div>
                    {isBreakdownVisible[index] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  {isBreakdownVisible[index] && (
                    <Breakdown
                      item={item}
                      isBreakdownVisible={isBreakdownVisible[index]}
                    />
                  )}
                </div>
              </div>
              <div className="bg-white border-2 border-gray-300 border-opacity-40 cursor-pointer rounded-md px-3 py-2 overflow-hidden">
                <div
                  className="text-sm flex justify-between font-semibold items-center text-[#0084FF]"
                  onClick={() => toggleGraphVisibility(index)}
                >
                  <span>Visuals ✨</span>
                  <div>
                    {isGraphVisible[index] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  {isGraphVisible[index] && (
                    <div className="w-full h-full flex gap-2 justify-center items-center">
                      <SentenceLengthChart
                        data={categorizeSentences(analyseData, index)}
                      />
                      <BreakdownLineChart
                        data={calculateWordCounts(analyseData, index)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b">
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                      Breakdown:
                    </th>
                    <td className="py-4 px-10 font-bold bg-grey-lightest text-sm border-b border-grey-light">
                      {item.sentences
                        .map(
                          (sentence) => sentence.sentence.split(/\s+/).length
                        )
                        .join(", ")}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                      Rhythm:
                    </th>
                    <td className="py-4 px-10 font-bold bg-grey-lightest text-sm border-b border-grey-light">
                      {calculateSentenceRhythm(
                        item.sentences.map((sentence) => sentence.sentence)
                      )}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                      Statistics:
                    </th>
                    <td className="py-4 px-6 bg-grey-lightest text-sm border-b border-grey-light">
                      <table className="w-full text-left border-collapse">
                        <tbody>
                          <tr className="border-b">
                            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-xs text-grey-dark border-b border-grey-light">
                              Short Sentences:
                            </th>
                            <td className="py-2 px-4 bg-grey-lightest text-xs border-b border-grey-light">
                              <div className="bg-green-500 text-white p-1 w-7 h-7 flex items-center justify-center rounded-full">
                                {
                                  item.sentences.filter(
                                    (sentence) =>
                                      sentence.sentence.split(/\s+/).length <= 5
                                  ).length
                                }
                              </div>
                            </td>
                          </tr>

                          <tr className="border-b">
                            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-xs text-grey-dark border-b border-grey-light">
                              Medium Sentences:
                            </th>
                            <td className="py-2 px-4 bg-grey-lightest text-xs border-b border-grey-light">
                              <div className="bg-yellow-500 text-white p-1 w-7 h-7 flex items-center justify-center rounded-full">
                                {
                                  item.sentences.filter(
                                    (sentence) =>
                                      sentence.sentence.split(/\s+/).length >
                                        5 &&
                                      sentence.sentence.split(/\s+/).length <=
                                        18
                                  ).length
                                }
                              </div>
                            </td>
                          </tr>

                          <tr className="border-b">
                            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-xs text-grey-dark border-b border-grey-light">
                              Long Sentences:
                            </th>
                            <td className="py-2 px-4 bg-grey-lightest text-xs border-b border-grey-light">
                              <div className="bg-rose-500 text-white p-1  w-7 h-7 flex items-center justify-center rounded-full">
                                {
                                  item.sentences.filter(
                                    (sentence) =>
                                      sentence.sentence.split(/\s+/).length > 18
                                  ).length
                                }
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Statistics;
