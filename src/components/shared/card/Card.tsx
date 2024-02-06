import { Box, useStyleConfig } from '@chakra-ui/react'
import React from 'react'

type Props = {
    children: React.ReactNode
} & Rest

export const Card: React.FC<Props> = ({ children, ...rest }) => {

    const baseStyle = useStyleConfig('Card')

	return (<>
        <Box __css={baseStyle} {...rest}>
            {children}
        </Box>
    </>)
}