import { useEffect, useState } from 'react'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { FaPowerOff, FaTools } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'

import { authOptions } from '../../api/auth/[...nextauth]'

import { AdminDashboard } from '@components/layouts'
import { Card, StatCard, CircularProgressBar, LineChart, ChartCard, SkeletonLayout } from '@components/shared'
import { useMonitoringData } from '@core/hooks'
import { Logs } from '@components/modules'
import { adminDashboardServerSideProps } from '@core/utils/functions'

type Props = {
    bots: SanitizededBotConfig[]
	currentBot: SanitizededBotConfig
}

const MonitoringPage: NextPage<Props> = ({ bots, currentBot }) => {

	const [loading, setLoading] = useState(true)
	const { monitoringData, logs } = useMonitoringData()

	useEffect(() => {
		if (monitoringData && loading) setLoading(false)
	}, [monitoringData, loading])

	setTimeout(() => {
		setLoading(false)
	}, 10 * 1000)

	const getLatestData = () => monitoringData?.slice(-1)[0]

	return (<>

		<AdminDashboard breadcrumbs={['Monitoring']} bots={bots} currentBot={currentBot}>

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

						<Card>
							<Text fontSize='4xl' color={getLatestData()?.botStatus.maintenance ? 'green.500' : 'gray.500'}>
								<FaTools />
							</Text>
							<Flex direction='column' align='center' ml='2em'>
								<Text>Maintenance mode</Text>
								<Text fontSize='2xl' fontWeight='bold' color={getLatestData()?.botStatus.maintenance ? 'green.500' : 'gray.500'}>{getLatestData()?.botStatus.maintenance ? 'enabled' : 'disabled'}</Text>
							</Flex>
						</Card>

						<CircularProgressBar percentage={getLatestData()?.pid.cpu || 0} title='CPU' subtitle='usage'/>
						
						<CircularProgressBar percentage={getLatestData()?.pid.memory.percentage || 0} title='RAM' subtitle='usage'/>
						
						<StatCard 
							title='Discord latency' 
							value={`${getLatestData()?.latency.ping || 0}ms`}
							icon={<BsFillBarChartFill />}
							// growth={{ value: 3.5, unit: 'ms', text: 'since last minute', invert: true}}
						/>

					</SkeletonLayout>

				</SimpleGrid>

				<SimpleGrid columns={{ base: 1, md: 5, xl: 5 }} gap='20px' mb='20px'>

					<Box gridColumn={{ base: '1', md: '1 / 4' }}>
						<SkeletonLayout enabled={loading}>
							
							<Logs logs={logs || []}/>
						
						</SkeletonLayout>
					</Box>
						
					<Flex flexDirection='column' gap='20px' gridColumn={{ base: '1', md: '4 / 6' }}>

						<SkeletonLayout enabled={loading || monitoringData?.length! < 2}>

							<ChartCard title='Process Usage' h='350px'>
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
									options={{
										xaxis: {
											labels: {
												show: false
											}
										}
									}}
								/>
							</ChartCard>

							<ChartCard title='Host Usage' h='300px'>
								<LineChart 
									series={[
										{
											name: "CPU",
											data: monitoringData?.map(d => d.host.cpu) || [],
										},
										{
											name: "RAM",
											data: monitoringData?.map(d => d.host.memory.usedMemPercentage) || [],
										},
									]}
									options={{
										xaxis: {
											labels: {
												show: false
											}
										},
										yaxis: {
											max: 100,
											forceNiceScale: false,
											tickAmount: 5,
											labels: {
												formatter: (value) => `${value}%`
											}
										},
										chart: {
											animations: {
												easing: 'linear'
											}
										}
									}}
								/>
							</ChartCard>

						</SkeletonLayout>

					</Flex>


				
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { botId } = ctx.query
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

    return await adminDashboardServerSideProps(botId as string, session, ctx.req)
}

export default MonitoringPage