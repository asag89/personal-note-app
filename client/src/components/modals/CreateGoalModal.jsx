import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { createGoal } from "../../features/goal/goalSlice"
import { showModal } from "../../features/modal/modalSlice"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ModalTop from "../ModalTop"

// hooks
import { useScrollLock } from "../../hooks/useScrollLock"
import useWindowDimensions from "../../hooks/useWindowDimension"

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color:var(--modal-bg);
    position: fixed;
    top: 0;
    z-index:5;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .modal{
        width:500px;
        height: auto;
        border-radius: 10px;
        background-color: var(--primary-bg);
        -webkit-box-shadow: 0px 0px 15px 1px var(--white); 
        box-shadow: 0px 0px 15px 1px var(--white);

        form{
            width: 100%;
            padding: 10px 30px;
            margin: 30px 0;
            height: calc(100% - 55px);
            display: flex;
            flex-direction: column;
            justify-content: center;

            .inner-h3{
                color: var(--white);
                font-size: 1.4em;
                text-align: center;
                padding-bottom: 20px;
                font-weight: 500;
                font-size: 1.2em;
            }

            input{
                    width: 100%;
                    padding: 10px 15px;
                    background-color: var(--dark-bg-1);
                    color: var(--white);
                    border-radius: 5px;
                    font-size: 1rem;
                    font-weight: 600;
                    border: 1px solid transparent; 

                    &:focus{
                        border-bottom: 1px solid var(--white);
                    }
                }  
                .btn-container{
                    margin-top: 35px;
                    display: flex;
                    justify-content: space-between;

                    .btn{
                        padding: 10px 25px;
                        border-radius: 10px;
                        color: var(--white);
                        cursor: pointer;
                        font-weight: 600;

                    }

                    .btn-cancel{
                        background-color: var(--blue-1);
                    }

                    .btn-submit{
                        background-color: var(--pink-2);

                        &:disabled{
                            background-color: var(--pink-1);
                            cursor: auto;
                        }
                    }
                }
        }
    }

    @media(max-width: 540px) {
        .modal{
            width: 100%;
            height: 100%;
            border-radius: 0;
        }

        form{
            height: auto !important;
            margin-top:60px !important;
            
            .inner-h3{
                font-size: 1.4em;
            }
        }
    }
`

const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .2
        }
    },

}
const CreateGoalModal = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [goal, setGoal] = useState("")
    const { lockScroll, unlockScroll } = useScrollLock();
    const { modalLocation } = useSelector((state) => state.modal)
    const { width } = useWindowDimensions()

    useEffect(() => {
        lockScroll()

        return () => {
            unlockScroll()
        }
    }, [lockScroll, unlockScroll])

    useEffect(() => {

        if (location.pathname !== modalLocation) {
            dispatch(showModal(null))
        }
    }, [dispatch, location.pathname, modalLocation])

    const handleSubmit = (e) => {

        e.preventDefault()
        dispatch(createGoal({ goal }))
        dispatch(showModal(null))
    }
    return (
        <Container>
            <motion.div
                className="modal"
                variants={modal}
                initial="hidden"
                animate="visible"
            >
                {width <= 540 && <ModalTop text="Create a new goal" />}

                <form onSubmit={handleSubmit}>
                    <h3 className="inner-h3">What's your goal?</h3>
                    <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
                    <div className="btn-container">
                        <button type="button" className="btn btn-cancel" onClick={() => dispatch(showModal(null))}>Cancel</button>
                        <button type="submit" className="btn btn-submit" disabled={goal.length < 3 || goal.length > 100}>Submit</button>
                    </div>
                </form>
            </motion.div>
        </Container >
    )
}

export default CreateGoalModal