import { LinkBox , Image, Text, HStack, VStack} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

import { generalConfig } from '@config/general'

type BotCardProps = {
    bot: SanitizededBotConfig
    authorizedBots: string[]
}

export const BotCard: React.FC<BotCardProps> = ({ bot, authorizedBots }) => {

    const isAuthorized = authorizedBots.includes(bot.id)

	return (<>
        <LinkBox 
            as={Link} 
            href={isAuthorized ? `/admin/${bot.id}/monitoring` : '#'}
            cursor={isAuthorized ? 'pointer' : 'default'}   
        >
            <VStack>
                <Image 
                    src={bot.iconUrl || generalConfig.dashboard.fallbackBotIconUrl} 
                    alt='bot avatar'
                    w='100px' h='100px'
                    borderRadius='50%'
                    {...(isAuthorized ? {} : { opacity: 0.5 })}
                />
                <Text
                    {...(isAuthorized ? {} : { color: 'gray.500' })}
                >
                    {bot.name}
                </Text>
            </VStack>

        </LinkBox>
    </>)
}