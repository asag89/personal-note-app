
import styled from "styled-components"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
    width: 30px;
    height: auto;
    cursor: pointer;
    .logo{
        width: 100%;
        overflow: visible;
    }
`

const variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1
        }
    }
}
const Logo = () => {
    const navigate = useNavigate()
    return (
        <Container viewBox="100 40 320 420" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/")} >
            <motion.svg className="logo" viewBox="100 40 320 420" xmlns="http://www.w3.org/2000/svg"
                variants={variants}
                initial="hidden"
                animate="visible"
            >
                <defs>
                    <linearGradient id="a">
                        <stop stopColor="#e11efb" offset="0" />
                        <stop stopColor="#1eddfb" offset="1" />
                    </linearGradient>
                    <linearGradient id="b">
                        <stop stopColor="#e86f2e" offset="0" />
                        <stop stopColor="#e11efb" offset="1" />
                    </linearGradient>
                </defs>
                <g transform="translate(0,20)">
                    <path d="m278.93 429.56s135.7-77.381 128.83-143.15c-5.1855-49.677-64.846-98.905-105.82-134.27-41.187-35.543-31.057-134.27-31.057-134.27s-105.09 61.622-116.18 138.22c-8.9779 62.002 111.12 96.206 132.28 155.99 13.497 38.133-8.0518 117.48-8.0518 117.48z" fill="url(#b)" stroke="#111827" strokeWidth="3.2802" />
                    <path d="m246.73 441.41s-116.35-64.937-131.13-99.714c-21.71-51.088 21.855-149.08 21.855-149.08s104.28 91.851 116.18 145.13c8.403 37.627-6.9016 103.66-6.9016 103.66z" fill="url(#a)" stroke="#111827" strokeWidth="3.2802" />
                </g>
            </motion.svg>
        </Container>
    )
}

export default Logo