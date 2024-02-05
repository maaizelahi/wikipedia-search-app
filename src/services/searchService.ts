import axios from "axios";
import { getAuthToken } from "./authService";

const API_URL = "http://localhost:3333";

export const searchWithPagination = async (
  query: string,
  limit: number,
  offset: number
) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query, limit, offset },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPageContent = async (pageId: number) => {
  try {
    const response = await axios.get(`${API_URL}/search/page/${pageId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchHistory = async (limit: number, offset: number) => {
  try {
    const response = await axios.get(`${API_URL}/search/history`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
