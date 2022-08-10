import { Image } from '@chakra-ui/react'
import React from 'react'

type ImageResolverProps = {
    image: string | React.ReactNode
    alt?: string
}

export const ImageResolver: React.FC<ImageResolverProps> = ({ image, alt }) => {

    return (<>
        {typeof image === 'string' ?
            <Image 
            src={image} 
            alt={alt || 'undefined alt image'}
            width="200px"
        /> : image}
    </>)

}