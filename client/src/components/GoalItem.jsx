import styled from "styled-components";
import AddTaskIcon from '@mui/icons-material/AddTask';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from "react-redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { completeGoal, deleteGoal, setGoal } from "../features/goal/goalSlice";
import Spinner from "./Spinner";
import { showModal } from "../features/modal/modalSlice";
const Container = styled.div`


    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    display: flex;
    
    .complete-btn{
        width: 72px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        -webkit-box-shadow: 0px 0px 5px 0px var(--white); 
        box-shadow: 0px 0px 5px 0px var(--white);
        border-radius: 10px;
        background-color: transparent;
        cursor: pointer;

        &:hover{
            background-color: var(--scondary-bg);

        }

        .complete-icon{
            color: var(--white);
            font-size: 32px;
        }
    }

    .goal{
        border-radius: 10px;
        width: calc(100% - 82px);
        -webkit-box-shadow: 0px 0px 5px 0px var(--white); 
        box-shadow: 0px 0px 5px 0px var(--white);
        padding:  20px;
        display: flex;
        justify-content: space-between;

        .goal-text{
            font-size: 14px;
            color: var(--white);
            word-break: break-all;

        }

        .goal-settings{
            display: flex;
            align-items: center;
            background-color: transparent;
            cursor: pointer;
            margin-left: 20px;
            .more-icon{
                color: var(--white);
            }
        }
    }

    @media(max-width: 540px) {
        .goal{
            padding: 10px;
        }
    }
    
`

const GoalItem = ({ item, setProcessedId, processedId }) => {
    const { goalPageType, isLoading } = useSelector((state) => state.goal)
    const dispatch = useDispatch()

    const { _id, text, createdAt, updatedAt, isCompleted } = item

    return (
        <Container>

            {goalPageType === "current" ?
                <button className="complete-btn" title={"Complete"} onClick={() => { setProcessedId(_id); dispatch(completeGoal(_id)) }} >
                    {(isLoading && processedId === _id) ? <Spinner size={30} /> :
                        <AddTaskIcon className="complete-icon" />
                    }
                </button>
                :
                <button className="complete-btn" title={"Remove"} onClick={() => { setProcessedId(_id); dispatch(deleteGoal(_id)) }}>
                    {(isLoading && processedId === _id) ? <Spinner size={30} /> :
                        <HighlightOffIcon className="complete-icon" />
                    }
                </button>

            }
            <div className="goal">
                <p className="goal-text">{text}</p>
                <button className="goal-settings" onClick={() => { dispatch(showModal("goalOptions")); dispatch(setGoal({ createdAt, updatedAt, _id, isCompleted })) }}>
                    <MoreHorizIcon className="more-icon" />
                </button>
            </div>
        </Container>
    )
}

export default GoalItem