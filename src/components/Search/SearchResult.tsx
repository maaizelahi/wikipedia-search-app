import React from "react";
import parse from "html-react-parser";
import { removeHtmlTagsExceptSearchMatch } from "../../utils";

interface SearchResult {
  title: string;
  snippet: string;
  pageid: number;
}

const SearchResult: React.FC<SearchResult> = ({ title, snippet, pageid }) => {
  const handleClick = () => {
    // Open Page content
  };

  return (
    <div
      className="border border-gray-300 p-4 mb-4"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {parse(removeHtmlTagsExceptSearchMatch(snippet))}
    </div>
  );
};

export default SearchResult;
