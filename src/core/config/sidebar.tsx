import React from "react"

import { AiFillPieChart } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { SiClubhouse } from 'react-icons/si'

type SidebarConfigType = {

    tabs: {
        name: string
        href: string
        icon: React.ReactNode
    }[]
}

export const sidebarConfig: SidebarConfigType = {

    tabs: [
        {
            name: 'Monitoring',
            href: '/monitoring',
            icon: <AiFillPieChart />,
        },
        {
            name: 'Users',
            href: '/users',
            icon: <FaUserFriends />,
        },
        {
            name: 'Guilds',
            href: '/guilds',
            icon: <SiClubhouse />,
        }
    ]
}