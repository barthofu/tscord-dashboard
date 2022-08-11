import { Flex, Icon, Menu as ChakraMenu,MenuButton, MenuItem, MenuList, useColorModeValue, useDisclosure, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { ChartCard } from '@components/shared'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { IconType } from 'react-icons'

type Props = {
    title: string
    subtitle?: string
    defaultId: string
    charts: {
        id: string
        name?: string
        icon?: IconType
        component: React.ReactNode
    }[]
}

const Menu: React.FC<{ 
    setCurrentChartId: React.Dispatch<React.SetStateAction<string>>, 
    charts: { 
        id: string, 
        name?: string 
        icon?: IconType
    }[] 
}> = ({ setCurrentChartId, charts }) => {

    const textColor = useColorModeValue('secondaryGray.500', 'white')
    const textHover = useColorModeValue(
      { color: 'secondaryGray.900', bg: 'unset' },
      { color: 'secondaryGray.500', bg: 'unset' }
    )
    const iconColor = useColorModeValue('brand.500', 'white')
    const bgList = useColorModeValue('white', 'whiteAlpha.100')
    const bgShadow = useColorModeValue(
      '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
      'unset'
    )
    const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
    const bgHover = useColorModeValue(
      { bg: 'secondaryGray.400' },
      { bg: 'whiteAlpha.50' }
    )
    const bgFocus = useColorModeValue(
      { bg: 'secondaryGray.300' },
      { bg: 'whiteAlpha.100' }
    )

    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure()

    return (<>
        <ChakraMenu>
            <MenuButton
                textAlign='center'
                justifyContent='center'
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}
                w='37px'
                h='37px'
                lineHeight='100%'
                onClick={onOpen}
                borderRadius='10px'
            >
                <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
            </MenuButton>

            <MenuList
                w='150px'
                minW='unset'
                maxW='150px !important'
                border='transparent'
                backdropFilter='blur(63px)'
                bg={bgList}
                boxShadow={bgShadow}
                borderRadius='20px'
                p='15px'
            >
                
                {charts.map((chart, index) => (<>
                    <MenuItem
                        transition='0.2s linear'
                        color={textColor}
                        _hover={textHover}
                        p='0px'
                        borderRadius='8px'
                        _active={{ bg: 'transparent' }}
                        _focus={{ bg: 'transparent' }}
                        onClick={() => setCurrentChartId(chart.id)}
                        mb='10px'
                    >
                        <Flex align='center'>
                            {chart.icon && <Icon as={chart.icon} h='16px' w='16px' me='8px' />}
                            <Text fontSize='sm' fontWeight='400'>
                                {chart.name || chart.id}
                            </Text>
                        </Flex>
                    </MenuItem>
                </>))}

            </MenuList>
        
        </ChakraMenu>
    </>)
} 

export const MultiSwitcher: React.FC<Props> = ({ title, subtitle, defaultId, charts }) => {

    const [currentChartId, setCurrentChartId] = useState(defaultId)
    const getCurrentChart = () => charts.find(chart => chart.id === currentChartId)

	return (<>
        <ChartCard 
            title={title} 
            subtitle={subtitle}
            header={<>
                <Menu setCurrentChartId={setCurrentChartId} charts={charts} />
            </>}    
        >
            
            {getCurrentChart()?.component}

        </ChartCard>
    </>)
}