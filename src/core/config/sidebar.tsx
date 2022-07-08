import React from "react"

import { AiFillPieChart } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { SiClubhouse } from 'react-icons/si'
import { BiStats } from 'react-icons/bi'

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
            href: '/admin/monitoring',
            icon: <AiFillPieChart />,
        },
        {
            name: 'Statistics',
            href: '/admin/statistics',
            icon: <BiStats />,
        },
        {
            name: 'Users',
            href: '/admin/users',
            icon: <FaUserFriends />,
        },
        {
            name: 'Guilds',
            href: '/admin/guilds',
            icon: <SiClubhouse />,
        }
    ]
}