import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import stripAnsi from 'strip-ansi'

import { Card} from '@elements'

type LogsProps = {
    logs: LogsData[]
}

export const Logs: React.FC<LogsProps> = ({ logs }) => {

	return (<>
        <Card
            height='100%'
        >

            <Flex height='100%'  width='100%' flexDir='column' justifyContent='space-between'>

                <Flex px='25px' justify='space-between' alignItems='center' my='1.5em' w='100%'>

                    <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
                        Logs
                    </Text>

                </Flex>

                <Card bg='secondaryGray.300' height='100%'>

                    <Flex flexDir='column' justifyContent='flex-end' w='100%' h='100%'>
                        {logs.map((log, index) => <>
                            <Text key={index} fontSize='13px'>
                                {stripAnsi(log.message)}
                            </Text>
                        </>)}
                    </Flex>
                </Card>
            </Flex>

        </Card>
    </>)
}