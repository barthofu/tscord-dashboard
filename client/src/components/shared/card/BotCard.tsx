import { LinkBox , Image, Text, HStack, VStack, Circle, Box} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

import { generalConfig } from '@config/general'
import { Card } from './Card'

type BotCardProps = {
    bot: SanitizededBotConfig & { state: BotState }
}

export const BotCard: React.FC<BotCardProps> = ({ bot }) => {

    const isAuthorized = bot.state === 'authorized'

	return (<>
        <LinkBox 
            as={Link} 
            href={isAuthorized ? `/admin/${bot.id}/monitoring` : ''}
        >
            <Card
                _hover={{
                    transform: 'scale(1.05)',
                }}
                transition='.3s linear'
                cursor={isAuthorized ? 'pointer' : 'default'}
                width='unset'
                flexDir='column'
                p='2em'
            >
                <Box position='relative' mb='2em'>

                    <Image 
                        src={bot.iconUrl || generalConfig.dashboard.fallbackBotIconUrl} 
                        alt='bot avatar'
                        w='75px' h='75px'
                        borderRadius='50%'
                        {...(isAuthorized ? {} : { opacity: 0.3 })}
                    >
                    </Image>
                    <Circle
                        size='20px'
                        {...(isAuthorized ? { bg: 'green.300' } : { bg: 'red.500' })}
                        position='absolute'
                        right='.15em' bottom='.15em'
                    />

                </Box>
                <Text
                    {...(isAuthorized ? {} : { color: 'gray.500' })}
                    fontWeight='bold'
                >
                    {bot.name}
                </Text>
            </Card>

        </LinkBox>
    </>)
}