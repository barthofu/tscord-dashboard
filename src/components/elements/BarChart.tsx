import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { type ApexOptions } from "apexcharts"
import { Box, Flex, Text } from '@chakra-ui/react'
import _ from 'lodash'

import { Card } from '@elements'
import { barChartOptions } from '@config/charts'

type Props = {
	title: string
	series: ApexAxisChartSeries
	options?: ApexOptions
}

export const BarChart: React.FC<Props> = ({ title, series, options }) => {

	// deep merge default bar chart options with additionnal options if provided
	options = _.merge({}, barChartOptions, options)

	return (<>
    
        <Card
            justifyContent='flex-start'
            alignItems='flex-start'
            flexDirection='column'
            w='100%'
        >

            <Flex px='25px' justify='space-between' alignItems='center' my='1.5em'>
                <Text
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'
                >
                	{title}
                </Text>
            </Flex>

            <Box minH='300px' minW='100%' mt='auto'>
                <ApexChart 
                    type='bar'
                    series={series}
                    options={options}
                    width='100%'
                    height='100%' 
                />
            </Box>
        </Card>
    </>)
}