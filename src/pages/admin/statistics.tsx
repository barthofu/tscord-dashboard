import type { NextPage } from 'next'
import { FaUserFriends, FaUserCheck } from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'
import { HiOutlineCode } from 'react-icons/hi'
import { SiClubhouse } from 'react-icons/si'
import { SimpleGrid, Text } from '@chakra-ui/react'
import { type Cell } from 'react-table'

import { AdminDashboard } from '@layouts'
import { StatCard, LineChart, SimpleTable } from '@elements'

const mockupTableData = {
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
}

const StatisticsPage: NextPage = () => {

	return (<>

		<AdminDashboard breadcrumbs={['Statistics']}>

			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
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
					title='Total Active Users' 
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

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<LineChart 
                    title='Command usage'
                    series={[
                        {
                            name: "Simple commands",
                            data: [50, 64, 48, 66, 49, 68],
                        },
                        {
                            name: "Context menus",
                            data: [17, 19, 25, 33, 45, 50],
                        },
                        {
                            name: "Slash commands",
                            data: [150, 152, 160, 161, 170, 200],
                        },
                    ]}
                />
				<SimpleTable 
                    title='Top commands'
                    columnsData={mockupTableData.columns} 
                    tableData={mockupTableData.data}
                    cellsResolvers={mockupTableData.cellsResolvers}   
                />
			</SimpleGrid>
			
		</AdminDashboard>
	</>)
}

export default StatisticsPage