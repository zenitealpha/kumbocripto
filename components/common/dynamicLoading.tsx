import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DynamicLoading = ({ count, width }: any) => {
  return (
    <div
      style={{
        width: width ?? "100%",
      }}
      className="appy-form"
    >
      <Skeleton
        width="100%"
        className="mb-2"
        height={40}
        count={count ?? 5}
        borderRadius={10}
        direction="rtl"
        duration={2}
      />
    </div>
  );
};

export default DynamicLoading;
