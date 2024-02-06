import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, SimpleGrid, Spinner, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { useEffect, useRef, useState } from 'react'
import { BsFillBarChartFill } from 'react-icons/bs'
import { FaPowerOff, FaTools } from 'react-icons/fa'

import { authOptions } from '../../api/auth/[...nextauth]'

import { AdminDashboard } from '@components/layouts'
import { Logs } from '@components/modules'
import { Card, ChartCard, CircularProgressBar, LineChart, SkeletonLayout, StatCard } from '@components/shared'
import { adminDashboardServerSideProps, errorToast, fetcher, successToast } from '@core/utils/functions'
import useSWR from 'swr'

const refreshInterval = 5000

const MonitoringPage: NextPage<AdminDashboardProps> = ({ bots, authorizedBots, currentBot }) => {

	const [maintenanceLoading, setMaintenanceLoading] = useState(false)
	const [monitoringDataHistory, setMonitoringDataHistory] = useState<MonitoringData[]>([])

	const maintenance = useSWR<{ maintenance: boolean }>('/bot/maintenance', url => fetcher(url, currentBot.id), { refreshInterval })
	const monitoring = useSWR<MonitoringData[]>('/health/monitoring', url => fetcher(url, currentBot.id), { refreshInterval })
	const logs = useSWR<string[]>('/health/logs', url => fetcher(url, currentBot.id), { refreshInterval })

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()
    const cancelConfirmRef = useRef(null)

    const toast = useToast()

	const getLatestData = () => monitoringDataHistory.slice(-1)[0]
	
	const toggleMaintenance = (newState: boolean) => {
		
		setMaintenanceLoading(true)

		fetch(`/api/bot/${currentBot.id}/bot/maintenance`, {
            method: 'POST',
			body: JSON.stringify({
				maintenance: newState
			})
        })
        .then(res => {

            if (res.status === 200) {
				successToast(toast, `Maintenance ${newState ? 'enabled': 'disabled'}`)
				setMaintenanceLoading(false)
				maintenance.mutate()
			}
            else throw new Error()
        })
        .catch(() => {
            errorToast(toast, 'Error', `An error occured`)
			setMaintenanceLoading(false)
        })
	}

	const cardHoverBg = useColorModeValue('green.100', 'green.900')

	useEffect(() => {
		if (monitoring.data) {
			// @ts-ignore
			setMonitoringDataHistory(prev => {
				if (prev.length > 60) prev.shift()
				return [...prev, monitoring.data]
			})
		}
	}, [monitoring.data])

	return (<>

		<AdminDashboard 
			breadcrumbs={['Monitoring']} 
			bots={bots} 
			authorizedBots={authorizedBots} 
			currentBot={currentBot}
			fixedHeight={true}
		>

			{!monitoring.error ? <>
			
				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
					gap='20px'
					mb='20px'
				>

					<SkeletonLayout enabled={monitoringDataHistory.length === 0}>

						<Card>
							<Text fontSize='5xl' color={getLatestData()?.botStatus.online ? 'green.500' : 'red.500'}>
								<FaPowerOff />
							</Text>
							<Flex direction='column' align='center' ml='2em'>
								<Text>Bot is</Text>
								<Text fontSize='2xl' fontWeight='bold' color={getLatestData()?.botStatus.online ? 'green.500' : 'red.500'}>{getLatestData()?.botStatus.online ? 'online' : 'offline'}</Text>
							</Flex>
						</Card>

						<Card 
							onClick={() => onConfirmOpen()} 
							cursor='pointer'
							transition='0.2s linear'
							_hover={{
								bg: cardHoverBg
							}} 
						>
							{maintenanceLoading ? 
								<Spinner /> 
								:
								<Text fontSize='4xl' color={maintenance?.data?.maintenance ? 'green.500' : 'gray.500'}>
									<FaTools />
								</Text>
							}
							<Flex direction='column' align='center' ml='2em'>
								<Text>Maintenance mode</Text>
								<Text fontSize='2xl' fontWeight='bold' color={maintenance?.data?.maintenance ? 'green.500' : 'gray.500'}>{maintenance?.data?.maintenance ? 'enabled' : 'disabled'}</Text>
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
						<SkeletonLayout enabled={!logs.error && !logs.data}>
							
							<Logs logs={logs.data || []}/>
						
						</SkeletonLayout>
					</Box>
						
					<Flex flexDirection='column' gap='20px' gridColumn={{ base: '1', md: '4 / 6' }}>

						<SkeletonLayout enabled={monitoringDataHistory?.length! < 2}>

							<ChartCard title='Process Usage' h='350px'>
								<LineChart 
									series={[
										{
											name: "CPU",
											data: monitoringDataHistory.map(d => d.pid.cpu) || [],
										},
										{
											name: "RAM",
											data: monitoringDataHistory.map(d => d.pid.memory.percentage) || [],
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
											data: monitoringDataHistory.map(d => d.host.cpu) || [],
										},
										{
											name: "RAM",
											data: monitoringDataHistory.map(d => d.host.memory.usedMemPercentage) || [],
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

				<AlertDialog
					isOpen={isConfirmOpen}
					leastDestructiveRef={cancelConfirmRef}
					onClose={onConfirmClose}
				>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize='lg' fontWeight='bold'>
								Toggle maintenance mode
							</AlertDialogHeader>

							<AlertDialogBody>
								Are you sure to <em>{getLatestData()?.botStatus.maintenance ? 'disable' : 'enable'}</em> maintenance mode?
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button ref={cancelConfirmRef} onClick={onConfirmClose}>
									Cancel
								</Button>
								<Button colorScheme='red' onClick={() => {
									const currentMaintenance = getLatestData()?.botStatus.maintenance
									if (currentMaintenance !== undefined) {
										toggleMaintenance(!currentMaintenance)
									} else {
										errorToast(toast, 'Error', `An error occured, retry later`)
									}
									onConfirmClose()
								}} ml={3}>
									Confirm
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>

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