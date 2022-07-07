import { mode } from '@chakra-ui/theme-tools'

const styles = {

    baseStyle: (props: any) => ({

        p: "20px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
        borderRadius: "20px",
        minWidth: "0px",
        wordWrap: "break-word",
        bg: mode("white", "gray.700")(props),
        backgroundCalip: "border-box",
    })
}

export default styles