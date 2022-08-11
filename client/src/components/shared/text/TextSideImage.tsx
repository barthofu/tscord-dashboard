import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

type TextSideImageProps = {
    title: string
    image: string | React.ReactNode
    alt?: string
    isImgFirst?: boolean
    text?: string
    children?: React.ReactNode
    rest?: Rest
}

const ImageResolver = (image: string | React.ReactNode, alt: string) => {
    if (typeof image === 'string') {
        return <Image 
            src={image} 
            alt={alt}
            width="200px"
        />
    }
    return image
}

export const TextSideImage: React.FC<TextSideImageProps> = ({ title, image, alt, isImgFirst, text, children, ...rest }) => {

	return (<>

        <HStack
            spacing='10em' 
            w='60vw'
            justifyContent='center'
            {...rest}
        >

            {isImgFirst ? ImageResolver(image, alt || title) : null}

            <VStack 
                spacing={4} 
                alignItems='flex-start'
            >
                <Heading as='h2'>
                    {title}
                </Heading>

                {text ? 
                    <Text as='p'>
                        {text}
                    </Text>
                : null}

                {children}

            </VStack>

            {!isImgFirst ? ImageResolver(image, alt || title) : null}

        </HStack>
    </>)
}