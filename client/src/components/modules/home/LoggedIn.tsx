import { Flex, Text, Image, Link, Button } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'

type LoggedInProps = {
    session: Session
}

export const LoggedIn: React.FC<LoggedInProps> = ({ session }) => {

	return (<>
        <Flex alignItems='center'>
            <Flex alignItems='center' mr='2em'>
                <Image
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || undefined}
                    w='40px' h='40px'
                    mr='1em'
                    borderRadius='50%'
                />
                <Text fontSize='1.25em' fontWeight='800'>{(session.user?.name ?? session.user?.email) ?? "unknow"}</Text>
            </Flex>
            <Button
                size='sm'
                variant='outline'
                colorScheme='red'
                onClick={(e) => { e.preventDefault(); signOut() }}
            >
                Sign out
            </Button>
        </Flex>
    </>)
}