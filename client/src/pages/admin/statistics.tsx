import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { FaUserFriends, FaUserCheck } from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'
import { HiOutlineCode } from 'react-icons/hi'
import { SiClubhouse } from 'react-icons/si'
import { MdBarChart, MdMultilineChart } from 'react-icons/md'
import { SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { type Cell } from 'react-table'
import useSWR from 'swr'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

import { authOptions } from '../api/auth/[...nextauth]'

import { AdminDashboard } from '@layouts'
import { StatCard, LineChart, SimpleTable, BarChart, ChartCard, SimpleSwitcher, PieChart, Card, VSeparator } from '@elements'
import { getSanitizedBotsConfig } from '@config/bots'
import { colors } from '@config/charts'
import { fetcher } from '@core/utils/functions'

const typeResolver = {
    'CHAT_INPUT_COMMAND_INTERACTION': 'Command',
    'USER_CONTEXT_MENU_COMMAND_INTERACTION': 'Context Menu',
    'MESSAGE_CONTEXT_MENU_COMMAND_INTERACTION': 'Context Menu',
    'SIMPLE_COMMAND_MESSAGE': 'Message',
}

const tables = {

    topCommands: {
        columns: [
            { Header: 'Command name', accessor: 'name' },
            { Header: 'Type', accessor: 'type' },
            { Header: 'Total used', accessor: 'count' },
        ],
        cellsResolvers: {
            name: (cell: Cell) => <Text fontSize='lg' fontWeight='bold'>{cell.value}</Text>,
            type: (cell: Cell) => <Text fontSize='sm' fontWeight='regular'>{cell.value}</Text>,
            count: (cell: Cell) => <Text fontSize='sm' fontWeight='regular'>{cell.value}</Text>,
        }
    },

    topGuilds: {
        columns: [
            { Header: 'Guild', accessor: 'name' },
            { Header: 'Total commands', accessor: 'totalCommands' },
        ],
        cellsResolvers: {
            name: (cell: Cell) => <Text fontSize='lg' fontWeight='bold'>{cell.value}</Text>,
            totalCommands: (cell: Cell) => <Text fontSize='sm' fontWeight='regular'>{cell.value}</Text>,
        }
    }
}

type Props = {
    bots: SanitizededBotsConfig
}

const StatisticsPage: NextPage<Props> = ({ bots }) => {

    const stats = {
        totals: useSWR('/stats/totals', fetcher),
        topCommands: useSWR('/stats/topCommands', fetcher),
        topGuilds: useSWR('/stats/topGuilds', fetcher),
        lastInteraction: useSWR('/stats/lastInteraction', fetcher),
        commandsUsage: useSWR('/stats/commandsUsage', url => fetcher(url, { numberOfDays: 7 })),
        usersActivity: useSWR('/stats/usersActivity', fetcher),
        usersAndGuilds: useSWR('/stats/usersAndGuilds', url => fetcher(url, { numberOfDays: 7 })),
    }

    const commandsUsageSeries = [
        {
            name: "Simple commands",
            data: stats.commandsUsage.data?.map((commandUsage: { [key: string]: any }) => commandUsage.simpleCommands).reverse() || [],
        },
        {
            name: "Context menus",
            data: stats.commandsUsage.data?.map((commandUsage: { [key: string]: any }) => commandUsage.contextMenus).reverse() || [],
        },
        {
            name: "Slash commands",
            data: stats.commandsUsage.data?.map((commandUsage: { [key: string]: any }) => commandUsage.slashCommands).reverse() || [],
        },
    ]

    const usersActivity = {
        values: stats.usersActivity.data ? Object.values(stats.usersActivity.data) : [0],
        labels: stats.usersActivity.data ? Object.keys(stats.usersActivity.data) : [],
    }

	return (<>

		<AdminDashboard breadcrumbs={['Statistics']} bots={bots}>

			<SimpleGrid
				columns={{ base: 2, md: 2, lg: 3, "2xl": 6 }}
				gap='20px'
				mb='20px'
			>

				<StatCard 
					title='Total commands' 
					value={stats.totals.data?.stats.totalCommands}
					icon={<HiOutlineCode />}
				/>
                <StatCard 
					title='Total guilds' 
					value={stats.totals.data?.stats.totalGuilds}
					icon={<SiClubhouse />}
				/>
                <StatCard 
					title='Total Users' 
					value={stats.totals.data?.stats.totalUsers}
					icon={<FaUserFriends />}
				/>
                <StatCard 
					title='Total Active Users' 
					value={stats.totals.data?.stats.totalActiveUsers}
					icon={<FaUserCheck />}
				/>
                <StatCard 
					title='Last Interaction' 
					value={stats.lastInteraction.data?.createdAt ? `${timeAgo.format(new Date(stats.lastInteraction.data?.createdAt).getTime(), 'mini')} ago` : ''}
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
                                series={commandsUsageSeries}
                                options={{
                                    xaxis: {
                                        categories: stats.commandsUsage.data?.map((commandUsage: { [key: string]: any }) => commandUsage.date.split('/').slice(0, -1).join('/')).reverse(),
                                    }
                                }}
                            />
                        </>,
                        icon: MdBarChart
                    }}
                    chart2={{
                        id: 'lineChart',
                        component: <>
                            <LineChart 
                                series={commandsUsageSeries}
                                options={{
                                    xaxis: {
                                        categories: stats.commandsUsage.data?.map((commandUsage: { [key: string]: any }) => commandUsage.date.split('/').slice(0, -1).join('/')).reverse(),
                                    }
                                }}
                            />
                        </>,
                        icon: MdMultilineChart
                    }}
                />

                <SimpleTable
                    title='Top commands'
                    columnsData={tables.topCommands.columns} 
                    tableData={stats.topCommands.data?.map((command: { name: string, type: string, count: number}) => ({
                        name: command.name,
                        type: typeResolver[command.type as keyof typeof typeResolver],
                        count: command.count,
                    })) || []}
                    cellsResolvers={tables.topCommands.cellsResolvers}   
                />
				
                <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
                    <ChartCard 
                        title='Users'
                        subtitle='Part of active users of the bot inside all the known users'
                    >
                        <PieChart 
                            series={usersActivity.values as number[]}
                            options={{
                                fill: {
                                    colors: colors,
                                },
                                stroke: {
                                    width: 1,
                                    colors: [useColorModeValue('#fff', '#000')],
                                },
                                labels: usersActivity.labels,
                                dataLabels: {
                                    enabled: true
                                }
                            }}
                        />
                    </ChartCard >

                    <SimpleTable 
                        title='Top guilds'
                        columnsData={tables.topGuilds.columns} 
                        tableData={stats.topGuilds.data || []}
                        cellsResolvers={tables.topGuilds.cellsResolvers}   
                    />

                </SimpleGrid>

                <ChartCard title='Users and Guilds'>
                    <LineChart 
                        series={[
                            {
                                name: "Guilds",
                                data: stats.usersAndGuilds.data?.guilds.map((guild: any) => guild.count).reverse() || [],
                            },
                            {
                                name: "Users",
                                data: stats.usersAndGuilds.data?.users.map((user: any) => user.count).reverse() || [],
                            },
                        ]}
                        options={{
                            xaxis: {
                                categories: stats.usersAndGuilds.data?.users.map((user: any) => user.date.split('/').slice(0, -1).join('/')).reverse() || []
                            }
                        }}
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