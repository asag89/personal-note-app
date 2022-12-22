import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { showModal } from "../../features/modal/modalSlice"
import useCalculateTime from "../../hooks/useCalculateTime"
import { useState } from "react";
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react";
import { deleteGoal } from "../../features/goal/goalSlice";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useLocation } from "react-router-dom";
import ModalTop from "../ModalTop";
import useWindowDimensions from "../../hooks/useWindowDimension";
const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color:var(--modal-bg);
    position: fixed;
    top: 0;
    z-index:5;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .modal{
        width:340px;
        height: auto;
        margin-top: 140px;
        border-radius: 10px;
        background-color: #111827;
        -webkit-box-shadow: 0px 0px 15px 1px var(--white); 
        box-shadow: 0px 0px 15px 1px var(--white);
        overflow: hidden;

        .options{
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;

            .option{
                width: 100%;
                text-align: center;
                font-size: 16px;
                color: var(--white);
                border-top: 1px solid var(--grey-2);
                
                .btn{
                    width: 100%;
                    height: 100%;
                    padding: 15px 0;

                    background-color: transparent;
                    font-size: 16px;
                    color: var(--white);
                }

                .btn-details{
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .icon-wrapper{
                        display: flex;
                        align-items: center;
                    }
                }

                .danger{
                    color: var(--red-1);
                }

                &:hover{
                    background-color: var(--dark-bg-1);
                }
            }
            .details-container{
                width: 100%;
                height: 0;
                color: var(--white);

                .details-item{
                    padding: 10px;
                    background-color: var(--dark-bg-2);
                    margin: 8px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;

                }
            }
        }


    }

    @media(max-width: 540px) {
        .modal{
            margin-top: 0;

            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0;
        }

        .options-container{
            padding-top: 0 !important;
        }
    }
`

const GoalOptionsModal = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const { goalDetails } = useSelector((state) => state.goal)
    const { modalLocation } = useSelector((state) => state.modal)

    const { width } = useWindowDimensions()
    const { calculateCompletionTime } = useCalculateTime()
    const { createdTime, updatedTime, diffResult } = calculateCompletionTime(goalDetails.createdAt, goalDetails.updatedAt)

    const [dd, setDd] = useState(false)
    const parent = useAnimation()
    const child = useAnimation()
    const arrIcon = useAnimation()

    const { lockScroll, unlockScroll } = useScrollLock();

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
    useEffect(() => {
        if (dd) {
            parent.start({
                height: "auto",
                visibility: "visible",
                marginBottom: 20,
                transition: {
                    duration: .2
                }
            })

            child.start({
                visibility: "visible",
                transition: {
                    delay: .2
                }
            })

            arrIcon.start({
                rotate: 180,
                transition: {
                    duration: .2
                }
            })
        }
        else {
            parent.start({
                height: 0,
                visibility: "hidden",
                marginBottom: 0,
                transition: {
                    duration: .2
                }
            })
            child.start({
                visibility: "hidden",

            })
            arrIcon.start({
                rotate: 0,
                transition: {
                    duration: .2
                }
            })
        }
    }, [dd, parent, child, arrIcon])

    return (

        <Container>
            <div className="modal">
                <div className="options">
                    {width <= 540 && <ModalTop text="Note Options" />}

                    <div className="option">
                        <button className="btn btn-details" onClick={() => setDd(!dd)}>See the details <motion.div className="icon-wrapper" animate={arrIcon}><ExpandMoreRoundedIcon /></motion.div></button>
                    </div>
                    <motion.div className="details-container" animate={parent} >
                        <motion.div className="details-item" animate={child}>When it was created:<div>{createdTime}</div></motion.div>
                        {goalDetails.isCompleted &&
                            <>
                                <motion.div className="details-item" animate={child}>When it was completed:<div>{updatedTime}</div></motion.div>
                                <motion.div className="details-item" animate={child}>Completion time:<div>{diffResult}</div></motion.div>
                            </>
                        }
                    </motion.div>

                    <div className="option">
                        <button className="btn danger" onClick={() => { dispatch(deleteGoal(goalDetails._id)); dispatch(showModal(null)) }}>Remove</button>
                    </div>
                    <div className="option">
                        <button className="btn" onClick={() => dispatch(showModal(null))}>Cancel</button>
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default GoalOptionsModal