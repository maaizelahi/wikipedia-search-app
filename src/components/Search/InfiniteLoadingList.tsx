import React, { useState, useCallback, useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";
import SearchResult from "./SearchResult";
import { searchWithPagination } from "../../services/searchService";
import AutoSizer from "react-virtualized-auto-sizer";

interface InfiniteLoadingListProps {
  initialItems: SearchResult[];
  currentQuery: string;
}

const InfiniteLoadingList: React.FC<InfiniteLoadingListProps> = ({
  initialItems,
  currentQuery,
}) => {
  const [items, setItems] = useState<SearchResult[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const currentPageRef = useRef(1);

  const loadMoreItems = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      // Fetch the next page of items with the current query
      const response = await searchWithPagination(
        currentQuery,
        10,
        currentPageRef.current
      );
      const newItems = response.query.search;

      setItems((prevItems) => [...prevItems, ...newItems]);
      currentPageRef.current += 1;
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentQuery]);

  useEffect(() => {
    const fetchInitialItems = async () => {
      try {
        if (currentQuery) {
          // Resetting current page
          currentPageRef.current = 0;
          const response = await searchWithPagination(
            currentQuery,
            10,
            currentPageRef.current
          );
          setItems(response.query.search);
          currentPageRef.current += 1;
        }
      } catch (error) {
        console.error("Error fetching initial items:", error);
      }
    };

    fetchInitialItems();
  }, [currentQuery]);

  const Row = React.memo(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      useEffect(() => {
        if (!isLoading && index === items.length - 1) {
          loadMoreItems();
        }
      }, [index, isLoading, items.length, loadMoreItems]);

      return (
        <div className="mb-4" style={style}>
          <SearchResult {...items[index]} />
        </div>
      );
    }
  );

  const itemHeight = 150;
  const visibleItemCount = 5;

  return (
    <AutoSizer disableHeight>
      {({ width }: { width: number }) => (
        <FixedSizeList
          className="List"
          height={itemHeight * visibleItemCount}
          itemCount={items.length}
          itemSize={itemHeight}
          width={width}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default InfiniteLoadingList;
