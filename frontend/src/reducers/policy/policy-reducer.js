import {
  SET_POLICY_DATA,
  SET_IS_POLICY_LOADING,
  SET_POLICY_PAGINATION,
  SET_POLICY_TIMELINE_DATA,
  SET_POLICY_TIMELINE_DATA_LOADING,
} from "../../actions/policy/types";

const initialState = {
  policyData: [],
  pagination: {
    totalPolicyCount: 0,
    totalNumPages: 0,
    dataPerPage: 0,
    currentPage: 1,
  },
  policyTimeline: {
    data: [],
    loading: false,
  },
  loading: false,
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET_POLICY_DATA:
      return {
        ...state,
        policyData: action.payload,
      };
    case SET_POLICY_PAGINATION:
      const {
        total_policy_count,
        total_num_pages,
        current_page,
        data_per_page,
      } = action.payload;
      return {
        ...state,
        pagination: {
          ...state.pagination,
          totalPolicyCount: total_policy_count,
          totalNumPages: total_num_pages,
          dataPerPage: data_per_page,
          currentPage: current_page,
        },
      };
    case SET_IS_POLICY_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_POLICY_TIMELINE_DATA:
      return {
        ...state,
        policyTimeline: {
          ...state.policyTimeline,
          data: action.payload,
        },
      };
    case SET_POLICY_TIMELINE_DATA_LOADING:
      return {
        ...state,
        policyTimeline: {
          ...state.policyTimeline,
          loading: action.payload,
        },
      };
    default:
      return state;
  }
}
