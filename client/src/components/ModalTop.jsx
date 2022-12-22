
import styled from 'styled-components'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useDispatch } from 'react-redux';
import { showModal } from '../features/modal/modalSlice';


const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: var(--scondary-bg);
    color: var(--white);
    margin-bottom: 40px;
    border-bottom: 1px solid var(--white);

    .wrapper{
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    
    .btn-back{
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        .back-icon{
            color: var(--white);
            font-size: 2.4em;

        }
    }
    .title{
        font-size: 1.4em;
        font-weight: 500;
    }

    .placeholder{
        width: 32px;
        height: 100%;
    }
    }

`

// this component is used in small screens
const ModalTop = ({ text }) => {
    const dispatch = useDispatch()

    return (
        <Container>
            <div className="wrapper">
                <button className='btn-back' onClick={() => dispatch(showModal(null))}>
                    <KeyboardArrowLeftRoundedIcon className='back-icon' />
                </button>
                <h2 className='title'>{text}</h2>
                <div className='placeholder' />{/* placeholder */}
            </div>
        </Container>
    )
}

export default ModalTop