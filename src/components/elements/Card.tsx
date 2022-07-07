import { Box, useStyleConfig } from '@chakra-ui/react'
import React from 'react'

type Props = {
    children: React.ReactNode
} & any

export const Card: React.FC<Props> = ({ children, ...props }) => {

    const baseStyle = useStyleConfig('Card')

	return (<>
        <Box __css={baseStyle} {...props}>
            {children}
        </Box>
    </>)
}