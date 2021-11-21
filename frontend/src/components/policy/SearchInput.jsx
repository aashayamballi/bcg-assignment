import React from "react";

import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { dispatchPolicyData } from "../../actions/policy/policy-action-creator";

const { Search } = Input;

function SearchInput() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.policyReducer);

  const onSearch = (val) => {
    dispatch(dispatchPolicyData({ searchQuery: val }));
  };
  return (
    <>
      <Search
        allowClear
        disabled={loading}
        style={{ width: 20 }}
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </>
  );
}

export default React.memo(SearchInput);
