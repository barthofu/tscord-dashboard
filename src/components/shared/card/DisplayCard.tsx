import { Text, Image, VStack, HStack } from '@chakra-ui/react'
import { Card } from '@components/shared'
import React from 'react'

type DisplayCardProps = {
    title: string
    image?: string | React.ReactNode
} & Rest  

export const DisplayCard: React.FC<DisplayCardProps> = ({ image, title, children, ...rest }) => {

	return (<>
        <Card
            py='7px'
            role='group'
            position='relative'
            px={{ base: 5, sm: 6 }}
            w="100%"
            h="100%"
            {...rest}
        >

            <HStack spacing='2em' position='relative'>

                {typeof image === 'string' ? (
                    <Image
                        src={image}
                        alt={title}
                        w='60px'
                        h='60px'
                        borderRadius="50%"
                    />
                ) : image}

                <VStack spacing={2} alignItems="start" w="100%" mb="1" mt="-1">

                    <Text
                        as="span"
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        {title}
                    </Text>

                    {children}
                
                </VStack>

            </HStack>
        </Card>
    </>)
}