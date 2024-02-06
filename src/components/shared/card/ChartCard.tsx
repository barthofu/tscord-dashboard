import { Flex, Text } from '@chakra-ui/react'
import { Card } from '@components/shared'
import React from 'react'

type Props = {
    title: string
    subtitle?: string
    children: React.ReactNode
    header?: React.ReactNode
} & any

export const ChartCard: React.FC<Props> = ({ title, subtitle, children, header, ...props }) => {

	return (<>

        <Card
            justifyContent='flex-start'
            alignItems='flex-start'
            flexDirection='column'
            w='100%'
            h='450px'
            {...props}
        >

            <Flex px='25px' justify='space-between' alignItems='center' my='1.5em' w='100%'>

                <Flex flexDirection='column'>

                    <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
                        {title}
                    </Text>

                    {subtitle && (
                        <Text fontSize='14px' fontWeight='400' lineHeight='100%' mt='1em'>
                            {subtitle}
                        </Text>
                    )}
                </Flex>

                {header}

            </Flex>
        
            {children}

        </Card>
    </>)
}