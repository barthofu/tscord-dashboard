import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FaPowerOff, FaTools } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import dayjs from 'dayjs'

import { AdminDashboard } from '@layouts'
import { Card, StatCard, CircularProgressBar, LineChart, ChartCard, SkeletonLayout } from '@elements'
import { useMonitoringData } from '@core/hooks'
import { useEffect, useState } from 'react'
import { Logs } from '@modules'

const MonitoringPage: NextPage = () => {

	const [loading, setLoading] = useState(true)
	const { monitoringData, logs }= useMonitoringData()

	useEffect(() => {

		if (monitoringData && loading) setLoading(false)
	}, [monitoringData, loading])

	setTimeout(() => {
		setLoading(false)
	}, 10 * 1000)

	const getLatestData = () => monitoringData?.slice(-1)[0]

	return (<>

		<AdminDashboard breadcrumbs={['Monitoring']}>

			{(monitoringData && monitoringData.length > 0) || loading ? <>
			
				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
					gap='20px'
					mb='20px'
				>

					<SkeletonLayout enabled={loading}>

						<Card>
							<Text fontSize='5xl' color={getLatestData()?.botStatus.online ? 'green.500' : 'red.500'}>
								<FaPowerOff />
							</Text>
							<Flex direction='column' align='center' ml='2em'>
								<Text>Bot is</Text>
								<Text fontSize='2xl' fontWeight='bold' color={getLatestData()?.botStatus.online ? 'green.500' : 'red.500'}>{getLatestData()?.botStatus.online ? 'online' : 'offline'}</Text>
							</Flex>
						</Card>

						<CircularProgressBar percentage={getLatestData()?.pid.cpu || 0} title='CPU' subtitle='usage'/>
						
						<CircularProgressBar percentage={getLatestData()?.pid.memory.percentage || 0} title='RAM' subtitle='usage'/>
						
						<StatCard 
							title='Latency' 
							value={`${getLatestData()?.latency.ping || 0}ms`}
							icon={<BsFillBarChartFill />}
							// growth={{ value: 3.5, unit: 'ms', text: 'since last minute', invert: true}}
						/>

						<Card>
							<Text fontSize='4xl' color={getLatestData()?.botStatus.maintenance ? 'green.500' : 'gray.500'}>
								<FaTools />
							</Text>
							<Flex direction='column' align='center' ml='2em'>
								<Text>Maintenance mode</Text>
								<Text fontSize='2xl' fontWeight='bold' color={getLatestData()?.botStatus.maintenance ? 'green.500' : 'gray.500'}>{getLatestData()?.botStatus.maintenance ? 'enabled' : 'disabled'}</Text>
							</Flex>
						</Card>

					</SkeletonLayout>

				</SimpleGrid>

				<SimpleGrid columns={{ base: 1, md: 5, xl: 5 }} gap='20px' mb='20px'>

					<Flex flexDirection='column' gap='20px' gridColumn='1 / 3'>

						<SkeletonLayout enabled={loading}>

							<ChartCard title='Usage' h='350px'>
								<LineChart 
									series={[
										{
											name: "CPU",
											data: monitoringData?.map(d => d.pid.cpu) || [],
										},
										{
											name: "RAM",
											data: monitoringData?.map(d => d.pid.memory.percentage) || [],
										},
									]}
								/>
							</ChartCard>

							<ChartCard title='Latency' h='300px'>
								<LineChart 
									series={[
										{
											name: "Discord WS",
											data: monitoringData?.map(d => d.latency.ping) || [],
										},
										// {
										// 	name: "API",
										// 	data: [],
										// },
									]}
									options={{
										xaxis: {
											categories: monitoringData?.map(d => dayjs(d.fetchedAt).format('HH:mm:ss')) || [],
											type: 'category'
										}
									}}
									area={false}
								/>
							</ChartCard>

						</SkeletonLayout>

					</Flex>

					<Box gridColumn='3 / 6'>
						<SkeletonLayout enabled={loading}>
							
							<Logs logs={logs || []}/>
						
						</SkeletonLayout>
					</Box>
						

				
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