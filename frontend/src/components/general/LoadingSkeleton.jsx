import React from "react";
import { Skeleton } from "antd";

export default function LoadingSkeleton({ rows = 5 }) {
  return (
    <>
      <Skeleton
        active
        title={{ width: "100%" }}
        paragraph={{ rows, width: "100%" }}
      ></Skeleton>
    </>
  );
}
