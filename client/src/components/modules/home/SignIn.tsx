import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import React from 'react'

type SignInProps = {}

export const SignIn: React.FC<SignInProps> = () => {

	return (<>
        <Button 
            size='lg'
            onClick={(e) => { e.preventDefault(); signIn('discord') }}
            className="btn-signin"
        >
            Sign in
        </Button>
    </>)
}