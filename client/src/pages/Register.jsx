
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Footer from "../components/Footer"
import Logo from "../components/Logo"
import { useDispatch, useSelector } from "react-redux"
import { clearError, register } from "../features/auth/authSlice"
import { Helmet } from "react-helmet-async"
import Spinner from "../components/Spinner"

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;

    .wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        width: 350px;

        h1{
            width: 100%;
            color: var(--white);
            text-align: center;
            font-size: 1.6rem;
            font-weight: 300;
            padding: 20px 0 10px;
        }

        form{
            width: 100%;
            height: auto;
            border: 1px solid var(--white);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 25px 5px;
            border-radius: 10px;
            background-color: var(--dark-bg-4);

            .input-grp{
                width: 80%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-bottom: 20px;

                label{
                    color: var(--white);
                    font-size: 14px;
                    font-weight: 400;
                    padding-bottom: 5px;
                }

                input{
                    width: 100%;
                    padding: 10px 15px;
                    background-color: var(--dark-bg-2);
                    border-radius: 10px;
                    font-size: 14px;
                    color: var(--white);

                    &:focus{
                        outline: 2px solid var(--blue-2);
                    }
                }

                button{
                    width: 100%;
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--pink-2);
                    color: var(--white);
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 1s;
                    
                    &:disabled{
                        background-color: var(--pink-1);
                    }
                }

                .err-msg{
                    text-align: center;
                    width: 100%;
                    color: var(--white);
                    padding: 5px;
                    border-radius: 10px;
                    background-color: var(--red-2); 
                }
            }
        }

        .redirect-container{
            margin: 20px 0 30px;
            border-radius: 10px;
            width: 100%;
            height: auto;
            background-color: var(--dark-bg-4);
            border: 1px solid var(--white);
            padding: 25px 0;
          
            p{
                text-align: center;
                font-size: 14px;
                color: var(--white);
                font-weight: 400;

                a{
                    color: var(--blue-2);
                }
            } 
        }
    }

    @media(max-width: 460px) {
        align-items: flex-start;
        margin-top: 50px;

        .wrapper{
            margin: 10px 0;
        }
        .input-grp{
                width: 90% !important;
        }
    }
`

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const { username, email, password } = registerUser

    const { user, isLoading, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/")
            }, [200])
        }
    }, [user, navigate])

    const handleChange = (e) => {
        setRegisterUser((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register({ username, email, password }))
    }

    return (
        <Container>
            <Helmet>
                <title>Register | Notee</title>
            </Helmet>
            <div className="wrapper">
                <Logo />
                <h1>Register to Notee</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-grp">
                        <label htmlFor="email">Username</label>
                        <input type="text" value={username} id="username" onChange={handleChange} />
                    </div>
                    <div className="input-grp">
                        <label htmlFor="email">Email</label>
                        <input type="text" value={email} id="email" onChange={handleChange} />
                    </div>
                    <div className="input-grp">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} id="password" onChange={handleChange} />
                    </div>
                    {isError &&
                        <div className="input-grp">
                            <p className="err-msg">{message}</p>
                        </div>
                    }
                    <div className="input-grp">
                        <button type="submit" disabled={!username || !email || !password}>{isLoading ? <Spinner size={15} /> : "Register"}</button>
                    </div>
                </form>
                <div className="redirect-container">
                    <p>Do you have an account? <Link to="/login" onClick={() => dispatch(clearError())}>Login</Link></p>
                </div>
                <Footer />
            </div>
        </Container >
    )
}

export default Register