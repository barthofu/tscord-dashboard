import { Flex, Text } from '@chakra-ui/react'
import { Card } from '@elements'
import React from 'react'

type Props = {
    title: string
    subtitle?: string
    children: React.ReactNode
}

export const ChartCard: React.FC<Props> = ({ title, subtitle, children }) => {

	return (<>

        <Card
            justifyContent='flex-start'
            alignItems='flex-start'
            flexDirection='column'
            w='100%'
        >

            <Flex px='25px' justify='space-between' alignItems='center' my='1.5em'>
                <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
                	{title}
                </Text>

                {subtitle && (
                    <Text fontSize='14px' fontWeight='400' lineHeight='100%'>
                        {subtitle}
                    </Text>
                )}

            </Flex>
        
            {children}

        </Card>
    </>)
}