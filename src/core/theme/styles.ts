import { mode } from "@chakra-ui/theme-tools"

const styles = {

    global: (props: any) => ({

        body: {
            bg: mode("secondaryGray.300", "gray.800")(props),
            fontFamily: "DM Sans",
        },
        html: {
            fontFamily: 'DM Sans',
        }
    })
}

export default styles