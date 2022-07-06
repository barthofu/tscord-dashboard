import { SimpleStatCard } from '@elements'
import type { NextPage } from 'next'

const HomePage: NextPage = () => {

	return (<>
		<SimpleStatCard 
			title="Total Users"
			value="10,000"
			icon="users"
			growth={{
				value: 10,
				text: '%'
			}}
		/>
	</>)
}

export default HomePage