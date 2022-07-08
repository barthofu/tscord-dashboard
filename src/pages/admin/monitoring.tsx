import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FaPowerOff, FaTools } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'

import { AdminDashboard } from '@layouts'
import { Card, StatCard, CircularProgressBar, LineChart } from '@elements'
import { useMonitoringData } from '@core/hooks'

const MonitoringPage: NextPage = () => {

	const { data, loading, error } = useMonitoringData()

	return (<>

		<AdminDashboard breadcrumbs={['Monitoring']}>
			
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
				gap='20px'
				mb='20px'
			>

				<Card>
					<Text fontSize='5xl' color={data.botOnline ? 'green.500' : 'red.500'}>
						<FaPowerOff />
					</Text>
					<Flex direction='column' align='center' ml='2em'>
						<Text>Bot is</Text>
						<Text fontSize='2xl' fontWeight='bold' color={data.botOnline ? 'green.500' : 'red.500'}>{data.botOnline ? 'online' : 'offline'}</Text>
					</Flex>
				</Card>

				<CircularProgressBar percentage={17} title='CPU' subtitle='usage'/>
				
				<CircularProgressBar percentage={64} title='RAM' subtitle='usage'/>
				
				<StatCard 
					title='Latency' 
					value='117ms'
					icon={<BsFillBarChartFill />}
					growth={{ value: 3.5, unit: 'ms', text: 'since last minute', invert: true}}
				/>

				<Card>
					<Text fontSize='4xl' color={data.maintenance ? 'green.500' : 'gray.500'}>
						<FaTools />
					</Text>
					<Flex direction='column' align='center' ml='2em'>
						<Text>Maintenance mode</Text>
						<Text fontSize='2xl' fontWeight='bold' color={data.maintenance ? 'green.500' : 'gray.500'}>{data.maintenance ? 'enabled' : 'disabled'}</Text>
					</Flex>
				</Card>

			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<Flex flexDirection='column' gap='20px'>
					<LineChart 
						title='Latency'
						series={[
							{
								name: "Discord",
								data: [50, 64, 48, 66, 49, 68],
							},
							{
								name: "API",
								data: [150, 152, 160, 161, 170, 200],
							},
						]}
					/>

					<LineChart 
						title='Usage'
						series={[
							{
								name: "CPU",
								data: [50, 64, 48, 66, 49, 68],
							},
							{
								name: "RAM",
								data: [150, 152, 160, 161, 170, 200],
							},
						]}
					/>
				</Flex>
				<Card />
			</SimpleGrid>
			
		</AdminDashboard>
	</>)
}

export default MonitoringPage