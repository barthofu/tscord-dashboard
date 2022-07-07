import { SimpleGrid } from '@chakra-ui/react'
import { StatCard } from '@elements'
import { AdminDashboard } from '@layouts'
import type { NextPage } from 'next'
import { CircularProgressBar } from 'src/components/elements/CircularProgressBar'

const MonitoringPage: NextPage = () => {

	return (<>
		<AdminDashboard breadcrumbs={['Monitoring']}>
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
				gap='20px'
				mb='20px'
			>
				<CircularProgressBar percentage={17} title='CPU' subtitle='usage'/>
				<CircularProgressBar percentage={64} title='Memory' subtitle='usage'/>
			</SimpleGrid>
			{/* <StatCard 
				title="Total Users"
				value="10,000"
				growth={{
					value: 10,
					unit: '%',
					text: 'since last month'
				}}
			/> */}
		</AdminDashboard>
	</>)
}

export default MonitoringPage