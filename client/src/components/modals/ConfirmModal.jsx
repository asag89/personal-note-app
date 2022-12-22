
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { showModal } from '../../features/modal/modalSlice'
import { deleteNote } from '../../features/note/noteSlice'
import { useScrollLock } from '../../hooks/useScrollLock'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--modal-bg);
    position: fixed;
    top: 0;
    z-index:5;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .modal{
        width:420px;
        height: auto;
        border-radius: 10px;
        background-color: var(--primary-bg);
        -webkit-box-shadow: 0px 0px 15px 1px var(--white); 
        box-shadow: 0px 0px 15px 1px var(--white);
        color: var(--white);
        display: flex;
        flex-direction: column;
        align-items: center;

        h2{
            font-size: 1.4em;
            font-weight: 500;
            width: 100%;
            margin-top: 20px;
            padding: 10px;
            text-align: center;
        }

        .btn-group{
            width: 100%;
            padding: 10px 20px;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;

            .btn{
                    padding: 10px 45px;
                    color:var(--white);
                    border-radius: 5px;
                    font-weight: 600;
                    transition: .5s;
                }
                .btn-confirm{
                    background-color: var(--pink-1);

                    &:hover{
                    background-color: var(--pink-2);

                    }
                }

                .btn-cancel{
                    background-color: var(--grey-2);

                    &:hover{
                    background-color: var(--grey-3);

                    }
                }
        }
    }
`
const ConfirmModal = () => {

    const { singleNote } = useSelector((state) => state.note)
    const { modalLocation } = useSelector((state) => state.modal)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

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

    const handleDelete = () => {
        dispatch(deleteNote(singleNote))
        dispatch(showModal(null))
        navigate("/my-notes")
    }
    return (
        <Container>
            <div className="modal">
                <h2>Confirm note deletion</h2>
                <div className="btn-group">
                    <button className='btn btn-cancel' onClick={() => dispatch(showModal(null))}>Cancel</button>
                    <button className='btn btn-confirm' onClick={handleDelete}>Confirm</button>
                </div>
            </div>
        </Container>
    )
}

export default ConfirmModal