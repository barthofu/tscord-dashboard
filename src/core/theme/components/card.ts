import { mode } from '@chakra-ui/theme-tools'

const styles = {

    baseStyle: {

        p: "20px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
        borderRadius: "20px",
        minWidth: "0px",
        wordWrap: "break-word",
        bg: mode("#ffffff", "navy.800"),
        backgroundClip: "border-box",
    }
}

export default styles