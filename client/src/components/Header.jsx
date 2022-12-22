import styled from "styled-components"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: var(--scondary-bg);
    border-bottom: 1px solid var(--white);

    .wrapper{
        height: 100%;
        margin: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--white);

        h1{
            font-size: 1.6em;
            font-weight: 500;
        }

        .quote{
            font-size: 14px;
        }
    }

    @media(max-width: 640px) {
    height: 55px;

        .wrapper{
        margin: 0 40px;
        justify-content: center;
        }

        .quote{
            display: none;
        }

}

@media(max-width: 500px) {
    height: 50px;

    h1{
        font-size: 1.4em !important;
    }
}
    
`
const box = {
    hidden: {
        opacity: 0,
        y: -100
    },
    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 1
        }
    }
}
const Header = () => {
    const { currentPage } = useSelector((state) => state.doc)

    return (
        <Container>
            <motion.div className="wrapper" variants={box} initial="hidden" animate="visible">
                <h1>{currentPage}</h1>
                <p className="quote">Life is short birds are flying.</p>
            </motion.div>
        </Container>
    )
}

export default Header