import React from 'react'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { type ApexOptions } from "apexcharts"
import { Box } from '@chakra-ui/react'
import _ from 'lodash'

import { barChartOptions } from '@config/charts'

type Props = {
	series: ApexAxisChartSeries
	options?: ApexOptions
}

export const BarChart: React.FC<Props> = ({ series, options }) => {

	// deep merge default bar chart options with additionnal options if provided
	options = _.merge({}, barChartOptions, options)

	return (<>
        <Box minH='300px' minW='100%' mt='auto'>

            <ApexChart 
                type='bar'
                series={series}
                options={options}
                width='100%'
                height='100%' 
            />

        </Box>
    </>)
}