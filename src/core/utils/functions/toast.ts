
export const successToast = (toast: Function, title: string, description?: string) => {
    toast({
        title,
        description,
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'bottom-right',
    })
}

export const errorToast = (toast: Function, title: string, description?: string) => {
    toast({
        title,
        description,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'bottom-right',
    })
}