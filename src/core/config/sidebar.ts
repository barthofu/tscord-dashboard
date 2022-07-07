type SidebarConfigType = {

    tabs: {
        name: string
        href: string
        icon: string
    }[]
}

export const sidebarConfig: SidebarConfigType = {

    tabs: [
        {
            name: 'Monitoring',
            href: '/monitoring',
            icon: 'fa-chart-bar',
        },
        {
            name: 'Users',
            href: '/users',
            icon: 'fa-users',
        },
        {
            name: 'Guilds',
            href: '/guilds',
            icon: 'fa-server',
        }
    ]
}