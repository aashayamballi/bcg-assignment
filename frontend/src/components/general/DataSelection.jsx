import React from "react";
import { Select } from "antd";

function DataSelection({
  placeholder = "Select option",
  disabled = false,
  handleSelection,
  options,
}) {
  const onChange = (value) => {
    handleSelection(value);
  };
  return (
    <>
      <Select
        showSearch
        allowClear
        disabled={disabled}
        style={{ width: "100%" }}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
      >
        {options}
      </Select>
    </>
  );
}

export default React.memo(DataSelection);
