import React from 'react'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { ApexOptions } from 'apexcharts'

import { Card } from '@components/shared'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
    percentage: number
    title: string
    subtitle: string
}

export const CircularProgressBar: React.FC<Props> = ({ percentage, title, subtitle }) => {

    const trackColor = useColorModeValue('#F4F7FE', '#40444B')

    const options: ApexOptions = {
        stroke: {
            lineCap: 'round'
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: trackColor,
                    startAngle: -90,
                    endAngle: 90,
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: false
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: "vertical",
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                    [
                        { offset: 0, color: "#4318FF", opacity: 1, },
                        { offset: 100, color: "#4318ff", opacity: 0.28, },
                    ],
                ],
            }
        },
        dataLabels: {
            enabled: false
        }
    }

	return (<>
        <Box position='relative'>
            <Card 
                height='100%'
                width='auto'
                padding='0px' 
            >
                <Flex flexDirection='column' justifyContent='center' alignItems='center'>
                    <ApexChart 
                        type='radialBar'
                        series={[percentage]}
                        options={options}
                        width='50%'
                        height='150px'
                    />
                    <Text fontSize='m' fontWeight='bold' color='secondaryGray.500' mt='-2em' mb='1em'>{percentage}%</Text>
                </Flex>
                <Flex
                    height='100%'
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    ml='2em'
                >
                    <Text fontSize='2xl' fontWeight={900}>{title}</Text>
                    <Text fontSize='m'>{subtitle}</Text>
                </Flex>
            </Card>
        </Box>
    </>)
}