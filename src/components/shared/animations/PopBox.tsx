import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'

const MotionBox = motion(Box)

export const variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    }
}

type PopBoxProps = {
    children: React.ReactNode
} & Rest

export const PopBox: React.FC<PopBoxProps> = ({ children, ...rest }) => {

    const controls = useAnimation()
    const { ref: viewRef, inView } = useInView({ threshold: 0, triggerOnce: false })

    useEffect(() => {

        if (!inView) controls.start('hidden')
        else controls.start('visible')

    }, [inView])

	return (<>
        <MotionBox
            initial="hidden"
            animate={controls}
            variants={variants}
            ref={viewRef}
            {...rest}
        >
            {children}
        </MotionBox>
    </>)
}