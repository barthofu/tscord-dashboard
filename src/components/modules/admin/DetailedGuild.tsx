import { Image, Text, HStack, Modal, ModalContent, ModalHeader, ModalOverlay, useToast, Tag, TagLeftIcon, TagLabel, ModalCloseButton, ModalBody, VStack, Wrap, Circle, useColorModeValue, ModalFooter, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, Stack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { mutate } from 'swr'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FiUsers } from 'react-icons/fi'

import { TextSection } from '@components/shared'
import { AdminDashboardContext } from '@core/contexts'
import { errorToast, getActivityColor, successToast } from '@core/utils/functions'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

type DetailedGuildProps = {
    isOpen: boolean
    onClose: () => void
    guild: any
}

export const DetailedGuild: React.FC<DetailedGuildProps> = ({ isOpen, onClose, guild }) => {

    const toast = useToast()

    const { currentBot } = useContext(AdminDashboardContext)

    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()
    const cancelConfirmRef = React.useRef(null)

    const { name, iconURL, memberCount, description, preferredLocale } = guild.discord
    const { lastInteract } = guild.database

    const deleteGuild = () => {

        fetch(`/api/bot/${currentBot.id}/bot/guilds/${guild.discord.id}`, {
            method: 'DELETE'
        })
        .then(res => {

            if (res.status === 200) successToast(toast, 'Guild deleted', `Guild "${guild.discord.name}" has been deleted`)
            else errorToast(toast, 'Error', `Error deleting guild "${guild.discord.name}"`)

            mutate('/bot/guilds')
            onClose()
        })
        .catch(() => {
            errorToast(toast, 'Error', `An error occured`)
            onClose()
        })
    }

    const getInviteLink = async () => {
        
        fetch(`/api/bot/${currentBot.id}/bot/guilds/${guild.discord.id}/invite`)
            .then(res => res.json())
            .then(data => {
                window.open(data.url, '_blank')
            })
            .catch((error) => {
                errorToast(toast, 'Error', `Couldn't get invite link`)
            })
    }

    return (<>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent position='relative' minH='500px' minW={['unset', 'unset', 'unset', '800px', '800px', '800px']} w={['90vw', '90vw', '90w', '50vw', '50vw', '50vw']}>

                <ModalHeader>

                    <Stack direction={['column', 'column', 'column', 'row', 'row', 'row']} spacing='1em' zIndex="1" display='flex' alignItems='center'>

                        <HStack spacing='1em'>
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
                        </HStack>

                        <HStack spacing='1em' zIndex="1" display='flex' alignItems='center'>
                            <Tag as="li">
                                <TagLeftIcon as={FiUsers} />
                                <TagLabel>{memberCount} members</TagLabel>
                            </Tag>
                        </HStack>
                    </Stack>

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
                                    <Circle size='12px' mr='0.5em' bg={getActivityColor(lastInteract)}
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
                    <Button colorScheme='red' mr={3} onClick={() => onConfirmOpen()}>
                        Leave guild
                    </Button>
                    <Button colorScheme='blue' mr={3} onClick={() => getInviteLink()}>
                        Invite link
                    </Button>
                </ModalFooter>

            </ModalContent>

        </Modal>

        <AlertDialog
            isOpen={isConfirmOpen}
            leastDestructiveRef={cancelConfirmRef}
            onClose={onConfirmClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Leave Guild
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You cannot undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelConfirmRef} onClick={onConfirmClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => {
                            deleteGuild()
                            onConfirmClose()
                        }} ml={3}>
                            Leave
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>)
}