import { As, Button, Icon, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChartCard } from '@components/shared'
import { IconType } from 'react-icons'

type ChartProp = {
    id: string
    component: React.ReactNode
    icon: IconType
}

type Props = {
    title: string
    subtitle?: string
    chart1: ChartProp
    chart2: ChartProp
}


export const SimpleSwitcher: React.FC<Props> = ({ title, subtitle, chart1, chart2 }) => {
    
    const [currentChartId, setCurrentChartId] = useState(chart1.id)
    const getCurrentChart = () => chart1.id === currentChartId ? chart1 : chart2,
          getOtherChart = () => chart1.id === currentChartId ? chart2 : chart1

	return (<>
        <ChartCard 
            title={title} 
            subtitle={subtitle}
            header={<>
                <Button
                    ms='auto'
                    textAlign='center'
                    justifyContent='center'
                    bg={useColorModeValue("secondaryGray.300", "whiteAlpha.100")}
                    _hover={useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.100" })}
                    _focus={useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" })}
                    _active={useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" })}
                    w='37px'
                    h='37px'
                    lineHeight='100%'
                    borderRadius='10px'
                    onClick={() => setCurrentChartId(currentChartId === chart1.id ? chart2.id : chart1.id)}
                >
                    <Icon as={getOtherChart().icon} color={useColorModeValue("brand.500", "white")} w='24px' h='24px' />
                </Button>
            </>}    
        >
            
            {getCurrentChart().component}

        </ChartCard>
    </>)
}