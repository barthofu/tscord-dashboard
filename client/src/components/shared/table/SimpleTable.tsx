import React, { useMemo } from 'react'
import {
    type Column,
    type Cell,
    useTable,
    useGlobalFilter,
    useSortBy,
    usePagination
} from 'react-table'

import { Card } from '@components/shared'
import { Checkbox, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'

type Props = {
    title: string
    columnsData: Column<object>[],
    tableData: object[]
    cellsResolvers?: { [key: string]: (cell: Cell<object, any>) => React.ReactNode }
    additionalProps?: any
}

export const SimpleTable: React.FC<Props> = ({ title, columnsData, tableData, cellsResolvers, additionalProps }) => {
    
    const columns = useMemo(() => columnsData, [columnsData])
    const data = useMemo(() => tableData, [tableData])

    const table = useTable(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const textColor = useColorModeValue('secondaryGray.900', 'white')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')

	return (<>
        <Card
            justifyContent='flex-start'
            alignItems='flex-start'
            flexDirection='column'
            w='100%'
            h='450px'
            overflowY='auto'
            overflowX='hidden'
            {...additionalProps}
        >

            <Flex px='25px' justify='space-between' alignItems='center' my='1.5em'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'
                >
                {title}
                </Text>
            </Flex>

            <Table {...table.getTableProps()} variant='simple' color='gray.500'>
                <Thead>
                    {table.headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                            <Th
                                {...column.getHeaderProps(column.getHeaderProps())}
                                key={index}
                                borderColor={borderColor}
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                    fontSize={{ sm: '10px', lg: '12px' }}
                                    color='gray.400'
                                >
                                    {column.render('Header')}
                                </Flex>
                            </Th>
                        ))}
                        </Tr>
                    ))}
                </Thead>

                <Tbody {...table.getTableBodyProps()}>
                    {table.rows.map((row, index) => {

                        table.prepareRow(row)

                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => (
                                    <Td
                                        {...cell.getCellProps()}
                                        key={index}
                                        fontSize={{ sm: '14px' }}
                                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                        borderColor='transparent'
                                    >
                                        {cellsResolvers ?
                                            cellsResolvers[cell.column.id](cell) :
                                            cell.render('Cell')
                                        }
                                    </Td>
                                ))}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Card>
    </>)
}