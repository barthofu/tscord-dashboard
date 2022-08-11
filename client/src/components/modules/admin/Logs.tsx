import React from 'react'
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import stripAnsi from 'strip-ansi'
import reactStringReplace from 'react-string-replace'

import { Card} from '@components/shared'

type LogsProps = {
    logs: LogsData[]
}

export const Logs: React.FC<LogsProps> = ({ logs }) => {

	return (<>
        <Card
            height='100%'
            minH='500px'
        >

            <Flex width='100%' flexDir='column' justifyContent='space-between'>

                <Flex px='25px' justify='space-between' alignItems='center' my='1.5em' w='100%'>

                    <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
                        Logs
                    </Text>

                </Flex>

                <Card 
                    bg={useColorModeValue('secondaryGray.300', 'gray.800')} 
                    flexDir='column' 
                    alignItems='flex-start'
                    justifyContent='flex-end' 
                    h='550px' 
                    overflowY='auto'
                >
                    {logs.map((log, index) => {

                        const message = stripAnsi(log.message)
                        let textElement = reactStringReplace(message, /\n/g, (match, i, o) => <br />)
                        // textElement = reactStringReplace(textElement, /\t/g, (match, i, o) => <span style={{ marginLeft: '10px' }} />)

                        return <Text key={index} fontSize='13px'>
                            {textElement}
                        </Text>
                    })}
                </Card>
            </Flex>

        </Card>
    </>)
}