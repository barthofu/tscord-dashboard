import React, { useState } from 'react'

type Props = {
    defaultId: string
    charts: {
        id: string
        name?: string
        component: React.ReactNode
    }[]
}

export const MultiSwitcher: React.FC<Props> = ({ defaultId, charts }) => {

    const [currentChartId, setCurrentChartId] = useState(defaultId)

	return (<>

    </>)
}