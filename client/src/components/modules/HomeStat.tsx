import { VStack, Text, Heading, Box } from '@chakra-ui/react'
import { Card, PopBox } from '@elements'
import React, { useEffect, useRef, useState } from 'react'
import { useCountUp } from 'react-countup'
import { useInView } from 'react-intersection-observer'

type HomeStatProps = {
    label: string | React.ReactNode
    value: number
    icon: React.ReactNode
    color?: string 
}

export const HomeStat: React.FC<HomeStatProps> = ({ label, value, icon, color }) => {

    const { ref: viewRef, inView } = useInView({ threshold: 0, triggerOnce: false })
    const [ initialized, setInitialized ] = useState(false)

    const countUpRef = useRef(null)
    const { start } = useCountUp({
        ref: countUpRef,
        start: 0,
        end: value,
        duration: 1.5,
        suffix: '+',
    })

    useEffect(() => {

        if (inView && !initialized) {
            console.log('animation started for ', label)
            start()
            setInitialized(true)
        }

    }, [inView, start, label])

	return (<>
        <PopBox>
            <Card
                bg='#29292C'
                position="relative"
                px={{ base: 5, sm: 6 }}
                py={7}
                w="100%"
                overflow="visible"
                _hover={{ bg: "#333336" }}
                transition="background 0.2s ease"
                boxShadow="var(--chakra-shadows-md)"
            >
                <VStack spacing={3} alignItems="center" w="full" mt="-1">

                    <Box fontSize={{ base: '16px', sm: '36px', md: '44px' }}>
                        {icon}
                    </Box>
                    
                    <Heading
                        as="h4"
                        fontFamily="Dystopian"
                        fontSize={{ base: "lg", md: "2xl" }}
                        fontWeight="bold"
                        letterSpacing="wide"
                    >
                        {label}
                    </Heading>

                    <Text as='span' mr='.5em' fontSize='3xl' ref={viewRef}>
                        <div ref={countUpRef} />
                    </Text>

                </VStack>

            </Card>
        </PopBox>
    </>)
}