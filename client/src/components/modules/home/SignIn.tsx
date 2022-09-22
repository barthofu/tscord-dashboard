import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import React from 'react'

type SignInProps = {}

const signInHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    signIn('discord')
}

export const SignIn: React.FC<SignInProps> = () => {

	return (<>
        <Button 
            size='lg'
            onClick={signInHandler}
            className="btn-signin"
        >
            Sign in
        </Button>
    </>)
}