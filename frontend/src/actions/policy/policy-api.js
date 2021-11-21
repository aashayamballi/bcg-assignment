import axios from "axios";
import { API_URL } from "../urls";

export const fetchPolicyDetails = async ({
  pageNum = "",
  searchQuery = "",
}) => {
  try {
    const result = await axios({
      method: "get",
      url: API_URL + "policy/",
      params: {
        page_num: pageNum,
        search_query: searchQuery,
      },
    });
    return result.data;
  } catch (e) {
    console.error(e.response.data);
    throw e.response.data;
  }
};

export const updatePolicyData = async (id, row) => {
  try {
    const result = await axios({
      method: "patch",
      url: API_URL + "policy/",
      data: {
        id,
        premium: row.premium,
      },
    });
    return result.data;
  } catch (error) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const fetchTimelineData = async ({ region = "" }) => {
  try {
    const result = await axios({
      method: "get",
      url: API_URL + "policy/timeline/",
      params: {
        region,
      },
    });
    return result.data;
  } catch (e) {
    console.error(e.response.data);
    throw e.response.data;
  }
};

export const getRegionData = async () => {
  try {
    const result = await axios({
      method: "get",
      url: API_URL + "policy/regions/",
    });
    return result.data;
  } catch (e) {
    console.error(e.response.data);
    throw e.response.data;
  }
};
