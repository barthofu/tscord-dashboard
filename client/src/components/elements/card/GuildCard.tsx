import { Box, Circle, Flex, HStack, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue, useDisclosure, VStack, Wrap, Heading, Badge, ModalCloseButton, ModalFooter, Button } from '@chakra-ui/react'
import React from 'react'
import { FiUsers } from 'react-icons/fi'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { Card, DisplayCard, TextSection } from '@elements'
import axios from 'axios'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')


type GuildCardProps = {
    id: string
    guild: any
}

const getActivityColor = (lastInteract: any) => {

    const now = new Date()
    const diff = now.getTime() - new Date(lastInteract).getTime()

    if (diff < 24 * 60*60*1000) {
        return 'green.500' // below one day
    } else if (diff < 7 * 24*60*60*1000) {
        return 'yellow.500' // between one day and one week
    } else {
        return 'red.500' // more than one week
    }
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

type DetailedGuildProps = {
    isOpen: boolean
    onClose: () => void
    guild: any
}

const DetailedGuild: React.FC<DetailedGuildProps> = ({ isOpen, onClose, guild }) => {

    const { name, iconURL, memberCount, description, preferredLocale } = guild.discord
    const { lastInteract } = guild.database

    const deleteGuild = () => {


    }

    const getInviteLink = () => {
        
        // axios.get(`/api/bot/${bots[0].id}/bot/guilds/${guild.id}/invite`)
        // .then(() => {
            
        //     mutate('/database/backup/list')
        //     setNewBackupLoading(false)

        //     toast({
        //         title: 'New backup created successfuly',
        //         status: 'success',
        //         duration: 6000,
        //         isClosable: true,
        //         position: 'bottom-right'
        //     })
        // })
    }

    return (<>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent position='relative' minH='500px' minW='800px' w='50vw'>

                <ModalHeader>

                    <HStack spacing='1em' zIndex="1" display='flex' alignItems='center'>
                        <Image
                            src={iconURL}
                            alt={name}
                            w='100px'
                            h='100px'
                            borderRadius="50%"
                        />

                        <Text as="span" fontSize="3xl" fontWeight="bold">
                            {name}
                        </Text>

                        <HStack spacing='1em' zIndex="1" display='flex' alignItems='center'>
                            <Tag as="li">
                                <TagLeftIcon as={FiUsers} />
                                <TagLabel>{memberCount} members</TagLabel>
                            </Tag>
                        </HStack>
                    </HStack>

                    <ModalCloseButton _focusVisible={{ display: 'none' }}></ModalCloseButton>
                    
                </ModalHeader>

                <ModalBody>

                    <VStack align='start' spacing='1em'>

                        <TextSection 
                            title='Description'
                            text={description ?? 'N/A'}
                        />

                        <Wrap spacing='5em'>
                            <TextSection title='Last Activity'>
                                <Tag bg={getActivityColor(lastInteract).replace('500', useColorModeValue('100', '900'))}>
                                    <Circle size='12px' mr='1em' bg={getActivityColor(lastInteract)}
                                    />
                                    <Text>
                                        {lastInteract ? timeAgo.format(new Date(lastInteract).getTime()) : 'N/A'}
                                    </Text>
                                </Tag>
                            </TextSection> 

                            <TextSection title='Language'>
                                <Tag>
                                    {preferredLocale}
                                </Tag>
                            </TextSection> 
                        </Wrap>

                    </VStack>
                    

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={() => deleteGuild()}>
                        Delete guild
                    </Button>
                    <Button colorScheme='blue' mr={3} onClick={() => getInviteLink()}>
                        Invite link
                    </Button>
                </ModalFooter>

            </ModalContent>

        </Modal>
    </>)
}