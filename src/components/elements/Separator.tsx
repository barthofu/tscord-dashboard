import { Flex } from '@chakra-ui/react'
import React from 'react'

type Props = any

export const HSeparator: React.FC<Props> = ({ ...args }) => {

    return <Flex 
        h='1px' 
        w='100%' 
        bg='rgba(135, 140, 189, 0.3)' 
        {...args} 
    />
}

export const VSeparator: React.FC<Props> = ({ ...args }) => {

    return <Flex 
        w='1px' 
        bg='rgba(135, 140, 189, 0.3)' 
        {...args} 
    />
}