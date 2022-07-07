import { StatCard } from '@elements'
import { AdminDashboard } from '@layouts'
import type { NextPage } from 'next'

const MonitoringPage: NextPage = () => {

	return (<>
		<AdminDashboard breadcrumbs={['Monitoring']}>
			<StatCard 
				title="Total Users"
				value="10,000"
				growth={{
					value: 10,
					unit: '%',
					text: 'since last month'
				}}
			/>
		</AdminDashboard>
	</>)
}

export default MonitoringPage