import React, { useState } from "react";
import SearchBar from "./SearchBar";
import InfiniteLoadingList from "./InfiniteLoadingList";
import SearchHistory from "./SearchHistory";
import Layout from "../Layout";
import { searchWithPagination } from "../../services/searchService";

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentQuery, setCurrentQuery] = useState(""); // Added to track the current query

  const handleSearch = async (query: string, limit = 10, offset = 0) => {
    try {
      const response = await searchWithPagination(query, limit, offset);
      setSearchResults(response.query.search);
      setCurrentQuery(query); // Update the current query
      console.log("Search results:", response);
      // Update state with search results
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <Layout>
      <SearchBar handleSearch={handleSearch} />

      <div className="flex flex-col md:flex-row justify-between">
        <section className="flex-1 m-4 md:m-8 bg-white rounded-lg border border-gray-300 p-4">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <InfiniteLoadingList
            initialItems={searchResults}
            currentQuery={currentQuery}
          />
        </section>

        {/* Search History */}
        <section className="flex-2 m-4 md:m-8 bg-white rounded-lg border border-gray-300 p-4">
          <h2 className="text-2xl font-semibold mb-4">Search History</h2>
          <SearchHistory />
        </section>
      </div>
    </Layout>
  );
};

export default SearchPage;
