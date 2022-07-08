import { mode } from "@chakra-ui/theme-tools"

const styles = {

    global: (props: any) => ({

        body: {
            bg: mode("secondaryGray.300", "gray.800")(props),
            fontFamily: "DM Sans",
        },
        html: {
            fontFamily: 'DM Sans',
        },

        // scrollbar 
        
        '::-webkit-scrollbar': {
            width: '5px'
        },
        '::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: mode('gray.300', 'gray.600')(props),
        },
        '::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0)'
        }
        
    })
}

export default styles