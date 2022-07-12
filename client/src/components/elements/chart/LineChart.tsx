import React from 'react'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { type ApexOptions } from "apexcharts"
import { Box } from '@chakra-ui/react'
import _ from 'lodash'

import { lineChartOptions } from '@config/charts'

type Props = {
	series: ApexAxisChartSeries
	options?: ApexOptions
    area?: boolean
}

export const LineChart: React.FC<Props> = ({ series, options, area }) => {

	// deep merge default line chart options with additionnal options if provided
	options = _.merge({}, lineChartOptions, options)

	return (<>
        <Box h='100%' maxH='450px' minW='100%' mt='auto'>

            <ApexChart 
                type={area ? 'area' : 'line'}
                series={series}
                options={options}
                width='100%'
                height='100%' 
            />
            
        </Box>
    </>)
}