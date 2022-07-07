import { StatCard } from '@elements'
import type { NextPage } from 'next'

const HomePage: NextPage = () => {

	return (<>
		<StatCard 
			title="Total Users"
			value="10,000"
			growth={{
				value: 10,
				unit: '%',
				text: 'since last month'
			}}
		/>
	</>)
}

export default HomePage