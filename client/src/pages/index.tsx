import { StatCard } from '@elements'
import { AdminDashboard } from '@layouts'
import type { NextPage } from 'next'

import { useSession, signIn, signOut } from 'next-auth/react'

const HomePage: NextPage = () => {
	const { data: session } = useSession();

	return (<>
			<h1>Hello world!</h1>
			{!session && <a href="#" onClick={(e) => { e.preventDefault(); signIn("discord");}}  className="btn-signin">Sign in</a>  } 
			{session && <>
				<p style={{ marginBottom: '10px' }}>
					Welcome, {(session?.user?.name ?? session?.user?.email) ?? "unknow"}
				</p>
				<a href="#" onClick={(e) => { e.preventDefault(); signOut();}} className="btn-signin">Sign out</a>
			</>} 
			
	</>)
}

export default HomePage