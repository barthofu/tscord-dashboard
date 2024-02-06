import { useToast, Box, Circle, Flex, HStack, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue, useDisclosure, VStack, Wrap, Heading, Badge, ModalCloseButton, ModalFooter, Button, css } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FiUsers } from 'react-icons/fi'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { Card, DisplayCard, TextSection } from '@components/shared'
import axios from 'axios'
import { AdminDashboardContext } from '@core/contexts'
import { mutate } from 'swr'
import { errorToast, successToast, getActivityColor } from '@core/utils/functions'
import { DetailedGuild } from '@components/modules'


type GuildCardProps = {
    id: string
    guild: any
}

export const GuildCard: React.FC<GuildCardProps> = ({ id, guild }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const { name, iconURL, memberCount } = guild.discord
    const { lastInteract } = guild.database

	return (<>
        <DisplayCard
            title={name}
            image={iconURL}
            h='100px'
            transition='background 0.1s linear'
            cursor='pointer'
            _hover={{
                background: useColorModeValue('gray.100', 'gray.900'),
            }}
            onClick={onOpen}
        >
            
            <HStack spacing='1em' zIndex="1" display='flex' alignItems='center'>
                <Tag as="li">
                    <TagLeftIcon as={FiUsers} />
                    <TagLabel>{memberCount}</TagLabel>
                </Tag>

                <Circle 
                    size='10px'
                    bg={getActivityColor(lastInteract)}
                />
            </HStack>

        </DisplayCard>

        <DetailedGuild 
            isOpen={isOpen}
            onClose={onClose}
            guild={guild}
        />
    </>)
}

