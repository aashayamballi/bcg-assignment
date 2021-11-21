import React from "react";

import ReactApexChart from "react-apexcharts";

function ZoomableTimelineChart({ data = [] }) {
  var options = {
    chart: {
      type: "area",
      stacked: false,
      id: "timelinedata",
    },
    noData: {
      text: "NO DATA FOUND",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#40a9ff",
        fontSize: "20px",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [100],
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={[{ name: "Count", data }]}
        height={353}
        type="area"
      />
    </>
  );
}

export default React.memo(ZoomableTimelineChart);
