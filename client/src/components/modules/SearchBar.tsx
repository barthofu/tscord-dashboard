import { CloseButton, Icon, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

type SearchBarProps = {
    search: string
    setSearch: (value: string) => void
    placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, placeholder = 'Search...'}) => {

	return (<>
        <InputGroup size="lg" w="full">
            <InputLeftElement>
                <Icon color="#858585" size={20} as={AiOutlineSearch} />
            </InputLeftElement>
            <Input
                placeholder={placeholder}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                colorScheme="primary"
                id="searchBar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search?.length > 0 && (
                <InputRightElement>
                    <CloseButton size="sm" rounded="full" onClick={() => setSearch('')} />
                </InputRightElement>
            )}
        </InputGroup>
    </>)
}