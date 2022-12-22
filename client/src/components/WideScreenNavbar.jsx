
import { motion } from "framer-motion"
import styled from "styled-components"
import Logo from "./Logo"
import { NavLink } from "react-router-dom";
import navLink from "../utils/navLink";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux"

const Container = styled.div`
    width: 100px;
    height: 100vh;
    border-right:  1px solid var(--white);
    position: fixed;

    .nav{
        margin: 20px 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;

        .navLink{
            border-radius: 10px;
            color: var(--blue-2);
        }

        .navLink > div{
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .active{
            color: var(--white);
            background-color: var(--dark-bg-5);

        }

        .logo{
            margin-bottom: 50px;
        }

        .icon{
            font-size: 2rem;            
            }

            .sm-icon{
                font-size: 1.6rem;
            }

            .btn-logout{
                background: transparent;

                .icon-logout{
                    color: var(--blue-2);
                    font-size: 2rem;
                }
            }
        }

    @media(max-width: 810px) {
        width: 80px;
    }
`

const box = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: {
        opacity: 0,
        x: -100
    },
    visible: {
        x: 0,
        opacity: 1,
    }
}
const WideScreenNavbar = () => {
    const dispatch = useDispatch()
    return (
        <Container>
            <motion.nav
                className="nav"
                initial="hidden"
                animate="visible"
                variants={box}
            >
                <Logo className="logo" />
                {navLink.map(({ path, svg, id }) => (
                    <NavLink to={path} className={({ isActive }) => isActive ? "navLink active" : "navLink"} key={id}>
                        <motion.div variants={item} key={id}>
                            {svg}
                        </motion.div>
                    </NavLink>
                ))}
                <motion.button initial={{ opacity: 0, x: -100 }} onClick={() => dispatch(logout())} animate={{ opacity: 1, x: 0 }} transition={{ delay: .8 }} className="btn-logout" title="Logout">
                    <LogoutOutlinedIcon className="icon-logout" />
                </motion.button>
            </motion.nav>
        </Container>
    )
}

export default WideScreenNavbar