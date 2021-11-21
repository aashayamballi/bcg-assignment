import { message } from "antd";

import { fetchPolicyDetails, fetchTimelineData } from "./policy-api";
import {
  SET_IS_POLICY_LOADING,
  SET_POLICY_DATA,
  SET_POLICY_PAGINATION,
  SET_POLICY_TIMELINE_DATA,
  SET_POLICY_TIMELINE_DATA_LOADING,
} from "./types";

export const dispatchPolicyData =
  ({ pageNum = "", searchQuery = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: SET_IS_POLICY_LOADING, payload: true });
      const response = await fetchPolicyDetails({ pageNum, searchQuery });
      const {
        page_data,
        current_page,
        data_per_page,
        total_policy_count,
        total_num_pages,
      } = response;
      const pagination = {
        current_page,
        data_per_page,
        total_policy_count,
        total_num_pages,
      };

      dispatch({ type: SET_POLICY_PAGINATION, payload: pagination });
      dispatch({ type: SET_POLICY_DATA, payload: page_data });
    } catch (error) {
      console.error(error);
      message.error("something went wrong while pulling timeline data");
    } finally {
      dispatch({ type: SET_IS_POLICY_LOADING, payload: false });
    }
  };

export const dispatchPolicyTimelineData =
  ({ region = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: SET_POLICY_TIMELINE_DATA_LOADING, payload: true });
      const response = await fetchTimelineData({ region });

      const timeline_xy = response.timeline_data.map((data) => {
        return {
          x: data.month,
          y: data.policies_bought,
        };
      });

      dispatch({
        type: SET_POLICY_TIMELINE_DATA,
        payload: timeline_xy,
      });
    } catch (error) {
      console.error(error);
      message.error("something went wrong while fetching timeline data");
    } finally {
      dispatch({ type: SET_POLICY_TIMELINE_DATA_LOADING, payload: false });
    }
  };
