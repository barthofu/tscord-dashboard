import { VStack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type TextSectionProps = {
    title: string
    text?: string
    children?: React.ReactNode
} & Rest

export const TextSection: React.FC<TextSectionProps> = ({ title, text, children, ...rest }) => {

	return (<>
        <VStack align='start' {...rest}>

            <Text fontSize='xl' color={useColorModeValue('gray.800', 'gray.300')} fontWeight='bold'>{title}</Text>

            {text && <Text>{text}</Text>}

            {children}

        </VStack>
    </>)
}