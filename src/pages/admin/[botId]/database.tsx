import { useContext, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { Box, Button, css, Flex, SimpleGrid, Spinner, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { type Cell } from 'react-table'
import axios from 'axios'
import useSWR, { useSWRConfig  } from 'swr'
import { BsFileEarmarkZipFill, BsPlusLg } from 'react-icons/bs'
import { MdSettingsBackupRestore } from 'react-icons/md'

import { authOptions } from '../../api/auth/[...nextauth]'

import { AdminDashboard } from '@components/layouts'
import { fetcher, adminDashboardServerSideProps, successToast, errorToast } from '@core/utils/functions'
import { Card, SimpleTable, StatCard } from '@components/shared'

const DatabasePage: NextPage<AdminDashboardProps> = ({ bots, authorizedBots, currentBot }) => {

    const [newBackupLoading, setNewBackupLoading] = useState<boolean>(false)

    const toast = useToast()

    const backupList = useSWR('/database/backups', url => fetcher(url, currentBot.id))
    const databaseSize = useSWR('/database/size', url => fetcher(url, currentBot.id))
    const { mutate } = useSWRConfig()

    const tables = {
        backupList: {
            columns: [
                { Header: 'Backup name', accessor: 'name' },
                { Header: 'Restore', accessor: 'restore' }
            ],
            cellsResolvers: {
                name: (cell: Cell) => <Text fontSize='lg' fontWeight='bold'>{cell.value}</Text>,
                restore: (cell: Cell) => <>
                    <Button onClick={() => {
                        
                        fetch(`/api/bot/${currentBot.id}/database/restore`, {
                            method: 'POST',
                            body: JSON.stringify({
                                snapshotName: cell.value
                            })
                        })
                            .then(res => {

                                if (res.status === 200) successToast(toast, 'Backup restored successfuly')
                                else throw new Error()
                            })
                            .catch(err => {
                                errorToast(toast, 'Couldn\'t restore backup')
                            })
                    }} fontSize='sm' fontWeight='regular'>Restore</Button>
                </>
            }
        }
    }

    const createNewBackup = async () => {

        setNewBackupLoading(true)

        fetch(`/api/bot/${currentBot.id}/database/backup`, { 
            method: 'POST'
        })
            .then(res => {

                if (res.status === 200) {
                    mutate('/database/backups')
                    setNewBackupLoading(false)
                    successToast(toast, 'Backup created successfuly')
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setNewBackupLoading(false)
                errorToast(toast, 'Backup failed')
            })
    }

	return (<>

		<AdminDashboard breadcrumbs={['Database']} bots={bots} authorizedBots={authorizedBots} currentBot={currentBot}>

			<SimpleGrid
				columns={[1, 1, 1, 1, 1, 3, 3]}
				gap='20px'
				mb='20px'
			>

                <Flex flexDirection='column'>
 
                    <Card
                        onClick={() => createNewBackup()}
                        cursor='pointer'
                        h='120px'
                        transition='background-color 0.4s linear'
                        _hover={{
                            backgroundColor: useColorModeValue('green.200', 'green.800')
                        }}
                    >
                        <Text fontSize='5xl' color='green.500'>
                            {newBackupLoading ? <Spinner /> : <BsPlusLg />}
                        </Text>
                        <Flex direction='column' align='center' ml='2em'>
                            <Text fontSize='xl' fontWeight='bold'>New backup</Text>
                        </Flex>
                    </Card>

                    <SimpleGrid
                        columns={[1, 2, 1, 1, 1, 2]}
                        gap='20px'
                        my='20px'
                    >

                        <StatCard 
                            title='Database size' 
                            value={databaseSize.data?.db ? `${(databaseSize.data.db / 1_000_000).toFixed(2)} Mo` : '-'}
                            icon={<BsFileEarmarkZipFill />}
                            
                        />

                        <StatCard 
                            title='Backups size' 
                            value={databaseSize.data?.backups ? `${(databaseSize.data.backups / 1_000_000).toFixed(2)} Mo` : '-'}
                            icon={<MdSettingsBackupRestore />}
                        />
                    </SimpleGrid>

                </Flex>

                <Box
                    gridColumn={{ md: '2', lg: '2 / 4' }}
                    h='500px'
                >
                    {backupList.data &&
                        <SimpleTable
                            title='Backups'
                            columnsData={tables.backupList.columns}
                            tableData={backupList.data.map((backup: string) => ({ name: backup, restore: backup })).reverse()}
                            cellsResolvers={tables.backupList.cellsResolvers}
                            additionalProps={{
                                h: '80vh'
                            }}
                        />
                    }
                </Box>
                
			</SimpleGrid>
			
		</AdminDashboard>
	</>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { botId } = ctx.query
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

    return await adminDashboardServerSideProps(botId as string, session, ctx.req)
}

export default DatabasePage