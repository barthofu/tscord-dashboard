import React from 'react'

import { Card } from '@components/shared'
import { Flex, Stat, StatLabel, StatNumber, Text, useColorModeValue } from '@chakra-ui/react'

type Props = {
    title: string
    value: string
    icon?: React.ReactNode
    growth?: {
        value: number
        unit: string
        text?: string
        invert?: boolean
    },
    textFirst?: boolean
}

export const StatCard: React.FC<Props> = ({ title, value, icon, growth, textFirst }) => {

	return (<>

        <Card py='15px'>
            <Flex
                my='auto'
                h='100%'
                alignItems='center'
                justifyContent='center'
            >

                {!textFirst && <Text fontSize='4xl' mr='0.5em'>{icon}</Text>}

                <Stat my='auto' ms={"18px"}>

                    <StatLabel lineHeight='100%' color={'secondaryGray.600'} fontSize={{ base: "sm" }}>
                        {title}
                    </StatLabel>

                    <StatNumber color={useColorModeValue('secondaryGray.900', 'white')} fontSize={{ base: "2xl" }}>
                        {value}
                    </StatNumber>

                    {growth ? (
                        <Flex align='center'>
                        <Text color={growth.value < 0 ? (growth.invert ? 'green.500' : 'red.500') : (growth.invert ? 'red.500' : 'green.500')} fontSize='xs' fontWeight='700' me='5px'>
                            {growth.value < 0 ? '-' : '+'}{growth.value}{growth.unit}
                        </Text>
                        <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                            {growth.text}
                        </Text>
                        </Flex>
                    ) : null}
                    </Stat>

                    {textFirst && <Text fontSize='4xl' ml='1em'>{icon}</Text>}

            </Flex>

        </Card>
    </>)
}