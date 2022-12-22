import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import { showModal } from "../../features/modal/modalSlice"
import { useScrollLock } from "../../hooks/useScrollLock"
import useWindowDimensions from "../../hooks/useWindowDimension"
import ModalTop from "../ModalTop"

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
        width:340px;
        height: auto;
        border-radius: 10px;
        background-color: var(--primary-bg);
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
                padding: 15px 0;
                font-size: 16px;
                color: var(--white);
                background-color: transparent;
                border-bottom: 1px solid var(--grey-2);

                &:hover{
                    background-color: var(--dark-bg-1);
                }
            }

            .danger{
                color: var(--red-1);
            }
        }
    }

    @media(max-width: 540px) {
        .modal{
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0;
        }

        .options-container{
            padding-top: 0 !important;
        }
    }
`

const NoteOptionsModal = () => {
    const dispatch = useDispatch()
    const location = useLocation()

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

    const handleClick = () => {
        dispatch(showModal("pdf"))
    }
    return (
        <Container>
            <div className="modal">
                <div className="options">
                    {width <= 540 && <ModalTop text="Note Options" />}
                    <button className="option" onClick={handleClick}>Download as PDF</button>
                    <button className="option">Share too...</button>
                    <button className="option">Copy link</button>
                    <button className="option danger" onClick={() => dispatch(showModal("confirm"))}>Delete</button>
                    <button className="option" onClick={() => dispatch(showModal(null))}>Cancel</button>
                </div>
            </div>
        </Container>
    )
}

export default NoteOptionsModal