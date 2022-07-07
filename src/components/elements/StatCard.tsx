import React from 'react'

import { Card } from '@elements'
import { Flex, Stat, StatLabel, StatNumber, Text, useColorModeValue } from '@chakra-ui/react'

type Props = {
    title: string
    value: string
    icon?: React.ReactNode
    growth?: {
        value: number
        unit: string
        text?: string
    }
}

export const StatCard: React.FC<Props> = ({ title, value, icon, growth }) => {

	return (<>

        <Card py='15px'>
            <Flex
                my='auto'
                h='100%'
                align={{ base: 'center', xl: 'flex-start' }}
                justify={{ base: 'center', xl: 'center' }}
            >

                {icon}

                <Stat my='auto' ms={"18px"}>

                    <StatLabel lineHeight='100%' color={'secondaryGray.600'} fontSize={{ base: "sm" }}>
                        {title}
                    </StatLabel>

                    <StatNumber color={useColorModeValue('secondaryGray.900', 'white')} fontSize={{ base: "2xl" }}>
                        {value}
                    </StatNumber>

                    {growth ? (
                        <Flex align='center'>
                        <Text color={growth.value < 0 ? 'red.500' : 'green.500'} fontSize='xs' fontWeight='700' me='5px'>
                            {growth.value < 0 ? '-' : '+'}{growth.value}{growth.unit}
                        </Text>
                        <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                            {growth.text}
                        </Text>
                        </Flex>
                    ) : null}
                    </Stat>

            </Flex>

        </Card>
    </>)
}