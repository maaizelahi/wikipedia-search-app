import React, { useEffect, useState } from "react";
import { getPageContent } from "../../services/searchService";

interface PageContentProps {
  pageId: number;
}

const PageContent: React.FC<PageContentProps> = ({ pageId }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPageContent(pageId);
        setContent(response.data.query.pages[pageId].extract);
      } catch (error) {
        console.error("Page content fetch error:", error);
      }
    };

    fetchData();
  }, [pageId]);

  return (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-2">Page Content</h2>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PageContent;
