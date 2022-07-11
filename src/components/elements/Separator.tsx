import { Flex } from '@chakra-ui/react'
import React from 'react'

type Props = any

export const HSeparator: React.FC<Props> = ({ ...props }) => {

    return <Flex 
        h='1px' 
        w='100%' 
        bg='rgba(135, 140, 189, 0.3)' 
        {...props} 
    />
}

export const VSeparator: React.FC<Props> = ({ ...props }) => {

    return <Flex 
        w='1px'
        h='100%'
        bg='rgba(135, 140, 189, 0.3)' 
        {...props} 
    />
}