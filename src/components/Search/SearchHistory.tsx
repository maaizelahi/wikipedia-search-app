import React, { useEffect, useState } from "react";
import { getSearchHistory } from "../../services/searchService";
import { getAuthToken } from "../../services/authService";
import { useUserContext } from "../../contexts/UserContext";

interface SearchHistoryItem {
  query: string;
}

const SearchHistory: React.FC = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loggedIn } = useUserContext();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // TODO: Implement pagination
        const response = await getSearchHistory(50, 0);
        console.log("Search history:", response);
        setHistory(response);
      } catch (error) {
        console.error("Search history fetch error:", error);
      }
    };

    if (loggedIn) {
      fetchHistory();
    }
  }, [loggedIn]);

  return (
    <div className="m-4">
      {loggedIn ? (
        <ul className="list-disc pl-4">
          {history.map((item, index) => (
            <li key={index} className="text-base py-1">
              {item.query}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base">Login to see search history.</p>
      )}
    </div>
  );
};

export default SearchHistory;
