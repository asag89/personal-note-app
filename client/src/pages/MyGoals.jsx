import styled from "styled-components"
// import { motion } from "framer-motion"
import GoalItem from "../components/GoalItem"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { showModal } from "../features/modal/modalSlice"
import { changeType, changeComplete } from "../features/goal/goalSlice"
import Spinner from "../components/Spinner"
import { Helmet } from "react-helmet-async"

const Container = styled.div`
    width: 100%;
    height: auto;

    .wrapper{
        margin: 40px 160px;
        width: calc(100% - 320px);
        height: auto;
        margin-bottom: 80px;
        border-radius: 10px;

        .header{
            width: 100%;
            height: 60px;
            border-radius: 10px;
            margin-bottom: 45px;  
            display: flex;
            align-items: center;
            justify-content: space-between;
            -webkit-box-shadow: 0px 0px 5px 0px var(--white); 
            box-shadow: 0px 0px 5px 0px var(--white);
            background-color: var(--scondary-bg);
            border-radius: 10px;

            .header-item{
                height: 100%;
                padding: 0 10px;
                display: flex;
                align-items: center;
                text-transform: capitalize;
                
                color: var(--white);
                font-size: 14px;

                &:first-child{
                    justify-content: space-between;
                    width: 45%;
                }

                &:last-child{
                width: 55%;
                    justify-content: flex-end;
                }
                .item-length{
                    color:${({ type }) => type === "current" ? "#ff29c6" : "#067eb5"};
                    font-size: 18px;
                    padding: 0 25px 0 5px;
                    font-weight: 600;
                }

                .rate-container{
                    display: flex;
                    align-items: center;


                .rate{
                    color: var(--white);
                    font-size: 18px;
                    padding-left: 5px;
                    font-weight: 600;
                }
            }
                .btn{
                    cursor: pointer;
                    background-color: transparent;
                    color: var(--white);
                    padding: 8px 15px;
                    width: 180px;
                    background-color:${({ type }) => type === "current" ? "#ff29c6" : "#067eb5"};
                    border-radius: 10px;
                    font-weight: 600;

                    &:first-child{
                        margin-right: 20px;
                    }
                }
            }
        }     
    }
    
    @media(max-width: 1200px) {
        .wrapper{
            width: 90%;
            margin:  40px auto 80px;
        }
    }

    @media(max-width: 980px) {
        .header{
            height: auto !important;
        }
        .header-item{
            width: auto !important;
            flex-direction: column;
        }
        .header-item:first-child{  
            align-items: flex-start !important;
        }
        .header-item > * {
            margin: 10px !important;
        }
        .header-item:last-child{
            align-items: flex-end ;
        }
    }

    @media(max-width: 540px) {
        .wrapper{
                margin-bottom:  40px;
        }
        .header{
            flex-direction: column;
            box-shadow: none !important; 
            margin-bottom: 30px !important;  
        }
        .header-item{
            font-size: 1em !important;
            width: 100% !important;
            align-items: flex-start !important;
            margin: 10px 0 5px !important;
        }
        .header-item> *{
            font-size: 1em !important;
            margin: 8px 0 !important;
            width: 100% !important;
            align-items: flex-start !important;
        }
        .item-length,.rate{
            font-size: 1.1em !important;
        }
    }
    
    @media(max-width: 500px) {
        .wrapper{
            width: calc(100% - 20px);
            margin: 40px 10px 50px;
        }
    }
`

const MyGoals = () => {
    const [rate, setRate] = useState(0)
    const { goals, completedGoals, currentGoals, goalPageType, isLoading } = useSelector((state) => state.goal)
    const dispatch = useDispatch()
    const [displayedGoals, setDisplayedGoals] = useState(currentGoals)
    const [processedId, setProcessedId] = useState("")

    useEffect(() => {
        if (goals) {
            dispatch(changeComplete(goals))
        }
    }, [goals, dispatch])

    useEffect(() => {
        setRate(((completedGoals.length * 100) / goals.length).toFixed())

    }, [completedGoals, goals])

    useEffect(() => {
        if (goalPageType === "current") {
            setDisplayedGoals(currentGoals)
        }
        if (goalPageType === "completed") {
            setDisplayedGoals(completedGoals)
        }
    }, [currentGoals, completedGoals, goalPageType])

    return (
        <Container type={goalPageType}>
            <Helmet>
                <title>My Goals | Notee</title>
            </Helmet>
            <div className="wrapper">
                <div className="header">
                    <div className="header-item">
                        <div>
                            {goalPageType} goals:<span className="item-length">{displayedGoals.length}</span>
                        </div>
                        {goals.length > 0 &&
                            <div className="rate-container">
                                Completion rate:<span className="rate"> {isLoading ? <Spinner size={20} /> : `${rate}%`}</span>
                            </div>
                        }
                    </div>
                    <div className="header-item">
                        <button className="btn" onClick={() => dispatch(changeType(goalPageType === "current" ? "completed" : "current"))}>Show {goalPageType === "current" ? "completed" : "current"} goals</button>
                        <button className="btn" onClick={() => dispatch(showModal("createGoal"))} >Create a new one</button>
                    </div>
                </div>
                <div className="goals">
                    {displayedGoals.map((item) => (
                        <GoalItem item={item} key={item._id} setProcessedId={setProcessedId} processedId={processedId} />
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default MyGoals