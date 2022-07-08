import React from 'react'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { ApexOptions } from 'apexcharts'
import { Card } from './Card'
import { Box } from '@chakra-ui/react'

type Props = {}

export const MultiLineChart: React.FC<Props> = () => {

    const series: ApexAxisChartSeries = [
        {
          name: "Discord latency",
          data: [50, 64, 48, 66, 49, 68],
        },
        {
          name: "API Latency",
          data: [150, 152, 160, 161, 170, 200],
        },
    ]
      

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                top: 13,
                left: 0,
                blur: 10,
                opacity: 0.1,
                color: "#4318FF",
            },
        },
        colors: ["#4318FF", "#39B8FF"],
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
    }

	return (<>
        <Card
            justifyContent='center'
            align='center'
            direction='column'
            w='100%'
            mb='0px'
        >
            <Box minH='300px' minW='100%' mt='auto'>
                <ApexChart 
                    type='line'
                    series={series}
                    options={options}
                    width='100%'
                    height='100%' 
                />
            </Box>
        </Card>
    </>)
}