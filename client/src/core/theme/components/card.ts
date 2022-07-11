import { mode } from '@chakra-ui/theme-tools'

const styles = {

    baseStyle: (props: any) => ({

        p: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        borderRadius: '12px',
        minWidth: '0px',
        wordWrap: 'break-word',
        bg: mode('white', 'gray.700')(props),
        // boxShadow: '0 2px 10px 0 rgba(0,0,0,0.16), 0 2px 15px 0 rgba(0,0,0,0.12)',
        backgroundCalip: 'border-box',
    })
}

export default styles