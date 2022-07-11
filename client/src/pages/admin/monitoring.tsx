import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import type { NextPage, NextPageContext } from 'next'
import { FaPowerOff, FaTools } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import io, { Socket } from 'socket.io-client'

import { AdminDashboard } from '@layouts'
import { Card, StatCard, CircularProgressBar, LineChart, ChartCard } from '@elements'
import { useMonitoringData } from '@core/hooks'
import { useState } from 'react'

const MonitoringPage: NextPage = () => {

	const data = useMonitoringData()

	const getLatestData = () => data?.slice(-1)[0]

	return (<>

		<AdminDashboard breadcrumbs={['Monitoring']}>
			
			{data && data.length > 0 ? <>
				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
					gap='20px'
					mb='20px'
				>

					<Card>
						<Text fontSize='5xl' color={getLatestData()!.botStatus.online ? 'green.500' : 'red.500'}>
							<FaPowerOff />
						</Text>
						<Flex direction='column' align='center' ml='2em'>
							<Text>Bot is</Text>
							<Text fontSize='2xl' fontWeight='bold' color={getLatestData()!.botStatus.online ? 'green.500' : 'red.500'}>{getLatestData()?.botStatus.online ? 'online' : 'offline'}</Text>
						</Flex>
					</Card>

					<CircularProgressBar percentage={getLatestData()!.pid.cpu || 0} title='CPU' subtitle='usage'/>
					
					<CircularProgressBar percentage={getLatestData()!.pid.memory.percentage} title='RAM' subtitle='usage'/>
					
					<StatCard 
						title='Latency' 
						value='117ms'
						icon={<BsFillBarChartFill />}
						growth={{ value: 3.5, unit: 'ms', text: 'since last minute', invert: true}}
					/>

					<Card>
						<Text fontSize='4xl' color={getLatestData()!.botStatus.maintenance ? 'green.500' : 'gray.500'}>
							<FaTools />
						</Text>
						<Flex direction='column' align='center' ml='2em'>
							<Text>Maintenance mode</Text>
							<Text fontSize='2xl' fontWeight='bold' color={getLatestData()!.botStatus.maintenance ? 'green.500' : 'gray.500'}>{getLatestData()!.botStatus.maintenance ? 'enabled' : 'disabled'}</Text>
						</Flex>
					</Card>

				</SimpleGrid>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
					<Flex flexDirection='column' gap='20px'>

						{/* <ChartCard title='Latency'>
							<LineChart 
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
						</ChartCard> */}

						<ChartCard title='Usage'>
							<LineChart 
								series={[
									{
										name: "CPU",
										data: data.map(d => d.pid.cpu),
									},
									{
										name: "RAM",
										data: data.map(d => d.pid.memory.percentage),
									},
								]}
							/>
						</ChartCard>

					</Flex>

					<Card />
				
				</SimpleGrid>
			</> 
			: 
			<>
				<Card w='250px'>
					<Text fontSize='5xl' color='red.500'>
						<FaPowerOff />
					</Text>
					<Flex direction='column' align='center' ml='2em'>
						<Text>Bot is</Text>
						<Text fontSize='2xl' fontWeight='bold' color='red.500'>offline</Text>
					</Flex>
				</Card>
			</>}
			
		</AdminDashboard>
	</>)
}

export default MonitoringPage