import { Heading } from '@chakra-ui/react'
import { BotCard } from '@components/shared'
import { fetcher } from '@core/utils/functions'
import React from 'react'
import useSWR from 'swr'

type AvailableBotsProps = {
    userId: string
}

const processBotList = (bots: BotsState) => {

    return bots.authorized.map(bot => ({ ...bot, state: 'authorized' }))
        .concat(bots.offline.map(bot => ({ ...bot, state: 'offline' })))
}

export const AvailableBots: React.FC<AvailableBotsProps> = ({ userId }) => {

    const bots = useSWR('/allUserAuthorizations', url => fetcher(url, undefined, { userId: userId }))

	return (<>
        <Heading as='h2' mt='2em' mb='1em'>Bots</Heading>
        {bots.data && <>            
            {processBotList(bots.data).map((bot: any) => (<>
                <BotCard 
                    key={bot.id}
                    bot={bot}
                />
            </>))}
        </>}
    </>)
}