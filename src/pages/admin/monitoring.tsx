import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FaPowerOff, FaTools } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'

import { AdminDashboard } from '@layouts'
import { Card, StatCard, CircularProgressBar, MultiLineChart } from '@elements'

const MonitoringPage: NextPage = () => {

	const isBotOnline = true
	const isMaintenanceEnabled = false

	return (<>
		<AdminDashboard breadcrumbs={['Monitoring']}>
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
				gap='20px'
				mb='20px'
			>
				<Card>
					<Text fontSize='5xl' color={isBotOnline ? 'green.500' : 'red.500'}>
						<FaPowerOff />
					</Text>
					<Flex direction='column' align='center' ml='2em'>
						<Text>Bot is</Text>
						<Text fontSize='2xl' fontWeight='bold' color={isBotOnline ? 'green.500' : 'red.500'}>{isBotOnline ? 'online' : 'offline'}</Text>
					</Flex>
				</Card>
				<CircularProgressBar percentage={17} title='CPU' subtitle='usage'/>
				<CircularProgressBar percentage={64} title='Memory' subtitle='usage'/>
				<StatCard 
					title='Latency' 
					value='117ms'
					icon={
						<BsFillBarChartFill />
					}
					growth={{
						value: 3.5,
						unit: 'ms',
						text: 'since last minute',
						invert: true
					}}
				/>
				<Card>
					<Text fontSize='4xl' color={isMaintenanceEnabled ? 'green.500' : 'gray.500'}>
						<FaTools />
					</Text>
					<Flex direction='column' align='center' ml='2em'>
						<Text>Maintenance mode</Text>
						<Text fontSize='2xl' fontWeight='bold' color={isMaintenanceEnabled ? 'green.500' : 'gray.500'}>{isMaintenanceEnabled ? 'enabled' : 'disabled'}</Text>
					</Flex>
				</Card>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<Flex flexDirection='column' gap='20px'>
					<MultiLineChart />
					<MultiLineChart />
				</Flex>
				<Card />
			</SimpleGrid>
			
		</AdminDashboard>
	</>)
}

export default MonitoringPage