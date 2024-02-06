import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import useSWR from 'swr'
import { Text, Flex, GridItem, HStack, Icon, InputGroup, InputLeftAddon, Select, SimpleGrid, Tag, useBreakpointValue, VStack, Spinner, Box, useToast } from '@chakra-ui/react'

import { authOptions } from '../../api/auth/[...nextauth]'

import { AdminDashboard } from '@components/layouts'
import { adminDashboardServerSideProps, errorToast, fetcher } from '@core/utils/functions'
import { GuildCard } from '@components/shared'
import { useState } from 'react'
import { SearchBar } from '@components/modules'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

const sortByOptions = [
    'members',
    'name',
    'activity'
] as const
type SortByOptionsType = typeof sortByOptions[number]

const GuildsPage: NextPage<AdminDashboardProps> = ({ bots, authorizedBots, currentBot }) => {

    const toast = useToast()

    const [sortBy, setSortBy] = useState<SortByOptionsType>('members')
    const [search, setSearch] = useState<string>('')

    const { 
        data: guildsData, 
        error,
        isValidating: isLoading
    } = useSWR('/bot/guilds', url => fetcher(url, currentBot.id), {
        dedupingInterval: 60000 // 1 minute
    })

    if (error) errorToast(toast, 'Error fetching guilds')

    const sortByIcon = useBreakpointValue({
        base: <Icon as={IoIosArrowDown} />,
        md: <Icon as={FaSortAmountDownAlt} pr="1" mr="1" />,
    })

    const processedGuildsData = guildsData ? guildsData
        .filter((guild: any) => {
            return search ? guild.discord.name.toLowerCase().includes(search.toLowerCase()) : true
        })
        .sort((a: any, b: any) => {
        
            if (sortBy === 'name') {
                return a.discord.name.toLowerCase().localeCompare(b.discord.name.toLowerCase())
            } else if (sortBy === 'members') {
                return b.discord.memberCount - a.discord.memberCount
            } else if (sortBy === 'activity') {
                return new Date(b.database.lastInteract).getTime() - new Date(a.database.lastInteract).getTime()
            }
        })
        : []

	return (<>

		<AdminDashboard breadcrumbs={['Guilds']} bots={bots} authorizedBots={authorizedBots} currentBot={currentBot}>

            <Flex w='100%' justifyContent='center'>

                <VStack
                    w='75vw'
                    mt='2em'
                    spacing='2em'
                >

                    <SimpleGrid
                        templateColumns={{ base: "auto 50px", md: "1fr 1fr 1fr" }}
                        gap={{ base: 2, md: "6" }}
                        mb={16}
                    >
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                            <SearchBar placeholder="Search guilds" {...{ search, setSearch }} />
                        </GridItem>
                        
                        <InputGroup
                            position="relative"
                            size="lg"
                            // maxW={{ base: "50px", md: "full" }}
                            sx={{ ".chakra-select__wrapper": { h: "47px" } }}
                        >
                            <InputLeftAddon display={{ base: "none", md: "flex" }}>
                                Sort by
                            </InputLeftAddon>
                            <Select
                                borderLeftRadius={{ md: "0" }}
                                onChange={(e) => setSortBy(e.target.value as SortByOptionsType)}
                                value={sortBy}
                                icon={<>{sortByIcon}</>}
                                // fontSize='md'
                                minW='60%'
                                // w={{ base: "45px", md: "full" }}
                            >
                                {sortByOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </InputGroup>

                    </SimpleGrid>

                    <VStack alignItems='flex-start'>

                        <HStack alignItems='center' mb='1em' spacing='1em'>

                            <Text fontSize="xl" fontWeight="bold">
                                All Guilds
                            </Text>

                            {isLoading ? 
                                <Spinner size="md" />
                                : 
                                <Tag size="md" fontWeight='bold'>{processedGuildsData.length}</Tag>
                            }
                        </HStack>

                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                            gap='20px'
                            mb='20px'
                        >

                            {processedGuildsData
                                .map((guild: any) => (

                                    <GuildCard
                                        key={guild.id}
                                        id={guild.id}
                                        guild={guild}
                                    />
                            ))}

                        </SimpleGrid>
                    </VStack>

                </VStack>
            </Flex>
			
		</AdminDashboard>
	</>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { botId } = ctx.query
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

    return await adminDashboardServerSideProps(botId as string, session, ctx.req)
}

export default GuildsPage