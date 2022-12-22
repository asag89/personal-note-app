import { NavLink } from "react-router-dom";
import styled from "styled-components"
import navLink from "../utils/navLink";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Container = styled.nav`
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: var(--dark-bg-2);
    border-top: 1px solid var(--white);

    height: 55px;
    .wrapper{
        width: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        .navLink{
            height: 80%;
            width: auto;
            display: flex;
            padding: 10px 20px;
            justify-content: center;
            align-items: center;
            color: var(--white);
            border-radius: 15px;

            .icon{
                font-size: 1.8em;
            }
        }

        .btn-logout{
                background: transparent;

                .icon-logout{
                    color: var(--white);
                    font-size: 2rem;

                }
            }
        .active{
            background-color: var(--dark-bg-5);
            color: var(--white);
        }
    }
`
const MobileNavbar = () => {
    const dispatch = useDispatch()
    return (
        <Container>
            <div className="wrapper">
                {navLink.map((item) => (
                    <NavLink className={({ isActive }) => isActive ? "navLink active" : "navLink"} to={item.path} key={item.id}>
                        {item.svg}
                    </NavLink>
                ))}
                <button className="btn-logout" onClick={() => dispatch(logout())} title="Log out">
                    <LogoutOutlinedIcon className="icon-logout" />
                </button>
            </div>
        </Container>
    )
}

export default MobileNavbar