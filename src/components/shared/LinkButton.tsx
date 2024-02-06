import React from 'react'

type Props = {
    href: string
    text: string
    style: 'primary' | 'secondary' | 'success' | 'error'
    external?: boolean
}

export const LinkButton: React.FC<Props> = ({ href, text, style = 'secondary', external }) => {

	return (<>
        <a 
            href={href}
            rel='noreferrer'
            target={external ? '_blank' : '_self'}
        >
            {text}
        </a>
    </>)
}