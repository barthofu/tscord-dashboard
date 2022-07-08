import { type ApexOptions } from "apexcharts"

export const lineChartOptions: ApexOptions = {
    chart: {
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            blur: 5,
            opacity: 0.1,
            color: "#000000",
        },
    },
    colors: ["#4318FF", "#39B8FF", "#FF9F43", "#FF9F43"],
    markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
    },
    tooltip: {
        theme: "dark",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },
    yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
    },
    xaxis: {
        type: "numeric",
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
    },
    grid: {
        show: false,
    },
    legend: {
        labels: {
            colors: "#A3AED0",
        }
    }
}