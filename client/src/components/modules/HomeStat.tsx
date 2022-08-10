import { HStack, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import CountUp, { useCountUp } from 'react-countup'
import { useInView } from 'react-intersection-observer'

type HomeStatProps = {
    label: string | React.ReactNode
    value: number
    icon: React.ReactNode
    color?: string 
}

let initialized = false

export const HomeStat: React.FC<HomeStatProps> = ({ label, value, icon, color }) => {

    const { ref: viewRef, inView } = useInView({ threshold: 0, triggerOnce: false })

    const countUpRef = useRef(null)
    const { start } = useCountUp({
        ref: countUpRef,
        start: 0,
        end: value,
        duration: 1.5,
        suffix: '+',
    })

    useEffect(() => {

        console.log('inView', inView)

        if (inView && !initialized) {
            start()
            initialized = true
        }
    }, [inView])

	return (<>
        <Box position='relative' ref={viewRef}>
            <VStack spacing={5}>
                <Text fontSize='7xl'>{icon}</Text>
                <Flex fontFamily="Dystopian" fontWeight='bold' flexDir='row' alignItems='center' justifyContent='center'>
                    <Text as='span' mr='.5em' fontSize='3xl'>
                        <div ref={countUpRef} />
                    </Text>
                    <Text fontSize='2xl' color='gray.400'>
                        {label}
                    </Text>
                </Flex>
            </VStack>
            {/* <VStack 
                opacity='.5' 
                position='absolute' 
                left='5px' top='5px' 
                spacing={5} 
                zIndex='-10' 
                width='100%'
            >
                <Text fontSize='7xl' color={color || 'gray.300'}>{icon}</Text>
                <Heading color={color || 'gray.300'} as='h3' fontSize='3xl' fontWeight='bold' display='flex' flexDir='row' justifyContent='center'>
                    <Text as='span' mr='.5em'>
                        <CountUp 
                            end={value} 
                            duration={5}
                            suffix='+'    
                        /></Text>
                    {label}
                </Heading>
            </VStack> */}
        </Box>
    </>)
}