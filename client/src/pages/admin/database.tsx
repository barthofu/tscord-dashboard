import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { Box, Button, css, Flex, SimpleGrid, Spinner, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { type Cell } from 'react-table'
import useSWR, { useSWRConfig  } from 'swr'
import { BsFileEarmarkZipFill, BsPlusLg } from 'react-icons/bs'

import { authOptions } from '../api/auth/[...nextauth]'

import { AdminDashboard } from '@layouts'
import { getSanitizedBotsConfig } from '@config/bots'
import { fetcher } from '@core/utils/functions'
import { Card, SimpleTable, StatCard } from '@elements'
import axios from 'axios'
import { MdSettingsBackupRestore } from 'react-icons/md'
import { useState } from 'react'

type Props = {
    bots: SanitizededBotsConfig
}

const DatabasePage: NextPage<Props> = ({ bots }) => {

    const [newBackupLoading, setNewBackupLoading] = useState<boolean>(false)

    const toast = useToast()

    const backupList = useSWR('/database/backup/list', fetcher)
    const databaseSize = useSWR('/database/size', fetcher)
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
                        axios.post(
                            `/api/bot/${bots[0].id}/database/restore`, 
                            { snapshotName: cell.value }
                        )
                            .then(() => {
                                toast({
                                    title: 'Backup restored successfuly',
                                    status: 'success',
                                    duration: 6000,
                                    isClosable: true,
                                    position: 'bottom-right'
                                })
                            })
                    }} fontSize='sm' fontWeight='regular'>Restore</Button>
                </>
            }
        }
    }

    const createNewBackup = async () => {

        setNewBackupLoading(true)
        axios.post(`/api/bot/${bots[0].id}/database/backup`)
            .then(() => {
                mutate('/database/backup/list')
                setNewBackupLoading(false)

                toast({
                    title: 'New backup created successfuly',
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                    position: 'bottom-right'
                })
            })
    }

	return (<>

		<AdminDashboard breadcrumbs={['Database']} bots={bots}>

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
                    <SimpleTable
                        title='Backups'
                        columnsData={tables.backupList.columns}
                        tableData={backupList.data?.map((backup: string) => ({ name: backup, restore: backup })).reverse() || []}
                        cellsResolvers={tables.backupList.cellsResolvers}
                        additionalProps={{
                            h: '80vh'
                        }}
                    />
                </Box>
                
			</SimpleGrid>
			
		</AdminDashboard>
	</>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            session: await unstable_getServerSession(ctx.req, ctx.res, authOptions),
            bots: getSanitizedBotsConfig()
        }
    }
}

export default DatabasePage