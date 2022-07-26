import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { unstable_getServerSession } from 'next-auth/next'
import { FaUserFriends, FaUserCheck } from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'
import { HiOutlineCode } from 'react-icons/hi'
import { SiClubhouse } from 'react-icons/si'
import { MdBarChart, MdMultilineChart } from 'react-icons/md'
import { Box, Flex, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { type Cell } from 'react-table'
import useSWR from 'swr'
import axios from 'axios'

import { authOptions } from '../api/auth/[...nextauth]'

import { AdminDashboard } from '@layouts'
import { StatCard, LineChart, SimpleTable, BarChart, ChartCard, SimpleSwitcher, PieChart, Card, VSeparator } from '@elements'
import { botsConfig, getSanitizedBotsConfig } from '@config/bots'

const mockupData = {

    topCommandsTable: {
        columns: [
            { Header: 'Command name', accessor: 'commandName' },
            { Header: 'Type', accessor: 'type' },
            { Header: 'Total used', accessor: 'totalUsed' },
        ],
        data: [
            { commandName: 'ping', type: 'Command', totalUsed: '87' },
            { commandName: 'help', type: 'Command', totalUsed: '45' },
            { commandName: 'help', type: 'Simple Command', totalUsed: '12' },
            { commandName: 'help', type: 'Simple Command', totalUsed: '12' },
            { commandName: 'help', type: 'Simple Command', totalUsed: '12' },
            { commandName: 'help', type: 'Simple Command', totalUsed: '12' },
            { commandName: 'help', type: 'Simple Command', totalUsed: '12' },
            { commandName: 'help', type: 'Simple Command', totalUsed: '12' },
        ],
        cellsResolvers: {
            commandName: (cell: Cell) => <Text fontSize='lg' fontWeight='bold'>{cell.value}</Text>,
            type: (cell: Cell) => <Text fontSize='sm' fontWeight='regular'>{cell.value}</Text>,
            totalUsed: (cell: Cell) => <Text fontSize='sm' fontWeight='regular'>{cell.value}</Text>,
        }
    },

    topGuildsTable: {
        columns: [
            { Header: 'Guild', accessor: 'guildName' },
            { Header: 'Total commands', accessor: 'totalCommands' },
        ],
        data: [
            { guildName: 'Guild 1 Voiture bla', totalCommands: '87' },
            { guildName: 'Guild 2', totalCommands: '45' },
            { guildName: 'Guild 3', totalCommands: '12' },
            { guildName: 'Guild 4', totalCommands: '12' },
        ],
        cellsResolvers: {
            guildName: (cell: Cell) => <Text fontSize='lg' fontWeight='bold'>{cell.value}</Text>,
            totalCommands: (cell: Cell) => <Text fontSize='sm' fontWeight='regular'>{cell.value}</Text>,
        }
    }
    
}

const fetcher = (url: string) => axios.get(`/api/bot/${botsConfig[0].id}` + url).then(res => res.data)

type Props = {
    bots: SanitizededBotsConfig
}

const StatisticsPage: NextPage<Props> = ({ bots }) => {

    const { data: session } = useSession()

    const { data, error } = useSWR('/stats/totals', fetcher)

    console.log(data)

	return (<>

		<AdminDashboard breadcrumbs={['Statistics']} bots={bots}>

			<SimpleGrid
				columns={{ base: 2, md: 2, lg: 3, "2xl": 6 }}
				gap='20px'
				mb='20px'
			>

				<StatCard 
					title='Total commands' 
					value='1291'
					icon={<HiOutlineCode />}
				/>
                <StatCard 
					title='Total guilds' 
					value='256'
					icon={<SiClubhouse />}
				/>
                <StatCard 
					title='Total Users' 
					value='10721'
					icon={<FaUserFriends />}
				/>
                <StatCard 
					title='Total Real Users' 
					value='354'
					icon={<FaUserCheck />}
				/>
                <StatCard 
					title='Last Interaction' 
					value='3s ago'
					icon={<BiTimeFive />}
				/>
                <StatCard 
					title='Last Guild added' 
					value='1h ago'
					icon={<BiTimeFive />}
				/>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>

                <SimpleSwitcher
                    title='Command usage'
                    chart1={{
                        id: 'barChart',
                        component: <>
                            <BarChart 
                                series={[
                                    {
                                        name: "Simple commands",
                                        data: [50, 64, 48, 66, 49, 68, 50],
                                    },
                                    {
                                        name: "Context menus",
                                        data: [17, 19, 25, 33, 45, 50, 50],
                                    },
                                    {
                                        name: "Slash commands",
                                        data: [150, 152, 160, 161, 170, 200, 50],
                                    },
                                ]}
                            />
                        </>,
                        icon: MdBarChart
                    }}
                    chart2={{
                        id: 'lineChart',
                        component: <>
                            <LineChart 
                                series={[
                                    {
                                        name: "Simple commands",
                                        data: [50, 64, 48, 66, 49, 68, 50],
                                    },
                                    {
                                        name: "Context menus",
                                        data: [17, 19, 25, 33, 45, 50, 50],
                                    },
                                    {
                                        name: "Slash commands",
                                        data: [150, 152, 160, 161, 170, 200, 50],
                                    },
                                ]}
                            />
                        </>,
                        icon: MdMultilineChart
                    }}
                />

                <SimpleTable
                    title='Top commands'
                    columnsData={mockupData.topCommandsTable.columns} 
                    tableData={mockupData.topCommandsTable.data}
                    cellsResolvers={mockupData.topCommandsTable.cellsResolvers}   
                />
				
                <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
                    <ChartCard 
                        title='Users'
                        subtitle='Part of active users of the bot inside all the known users'
                    >
                        <PieChart 
                            series={[
                                25, 75
                            ]}
                            options={{
                                fill: {
                                    colors: ['#0088FE', '#e0e0e0'],
                                }
                            }}
                        >

                            <Card
                                bg={useColorModeValue("white", "gray.600")}
                                flexDirection='row'
                                justifyContent='space-around'
                                boxShadow={useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset")}
                            >
                                <Flex direction='column' py='5px' alignItems={{ xl: 'center', '2xl': 'start' }}>
                                    <Flex align='center' flexDir={{ xl: 'column', '2xl': 'row' }}>
                                        <Box h='8px' w='8px' bg='#0088FE' borderRadius='50%' me='5px' mb={{ xl: '1em', '2xl': '0' }} />
                                        <Text fontSize='xs' color='secondaryGray.600' fontWeight='700'>
                                            Active users
                                        </Text>
                                    </Flex>
                                    <Text fontSize='lg' color={useColorModeValue("secondaryGray.900", "white")} fontWeight='700'>
                                        25%
                                    </Text>
                                </Flex>
                                <VSeparator />
                                <Flex direction='column' py='5px' me='10px' alignItems={{ xl: 'center', '2xl': 'start' }}>
                                    <Flex align='center' flexDir={{ xl: 'column', '2xl': 'row' }}>
                                        <Box h='8px' w='8px' bg='#e0e0e0' borderRadius='50%' me='5px' mb={{ xl: '1em', '2xl': '0' }} />
                                        <Text fontSize='xs' color='secondaryGray.600' fontWeight='700'>
                                            Total users
                                        </Text>
                                    </Flex>
                                    <Text fontSize='lg' color={useColorModeValue("secondaryGray.900", "white")} fontWeight='700'>
                                        10721
                                    </Text>
                                </Flex>
                            </Card>
                        </PieChart>
                    </ChartCard >

                    <SimpleTable 
                        title='Top guilds'
                        columnsData={mockupData.topGuildsTable.columns} 
                        tableData={mockupData.topGuildsTable.data}
                        cellsResolvers={mockupData.topGuildsTable.cellsResolvers}   
                    />

                </SimpleGrid>

                <ChartCard title='Users and Guilds'>
                    <LineChart 
                        series={[
                            {
                                name: "Guilds",
                                data: [17, 19, 25, 33, 45, 50, 50],
                            },
                            {
                                name: "Users",
                                data: [150, 152, 160, 161, 170, 200, 50],
                            },
                        ]}
                    />
                </ChartCard>
                
			</SimpleGrid>
			
		</AdminDashboard>
	</>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            session: await unstable_getServerSession(ctx.req, ctx.res, authOptions),
            bots: getSanitizedBotsConfig()
        }
    }
}

export default StatisticsPage