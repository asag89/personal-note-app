
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { filterByKeyword, setNoteId } from "../features/note/noteSlice";
import { showModal } from "../features/modal/modalSlice";
import { setDoc } from "../features/doc/docSlice";
import useCalculateReadingTime from "../hooks/useCalculateReadingTime";
import useCalculateTime from "../hooks/useCalculateTime";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import useWindowDimensions from "../hooks/useWindowDimension";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
    width: 100%;
    height: auto;

    .wrapper{
        margin: 40px 160px 80px;
        width: calc(100% - 320px);
        height: auto;

        .note-container{
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            
            .note-top{
                width: 100%;
                display: flex;
                justify-content: space-between;
                color: var(--white);
                align-items: center;
                border-bottom: 1px solid var(--white);

                .placeholder{
                    width: 25px;
                }
                h2{
                    width: auto;
                    text-align: center;
                }

                .settings-icon{
                    font-size: 1.6rem;
                    color: var(--white);
                    cursor: pointer;
                }

                .back-btn{
                    background-color: transparent;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .back-icon{
                        font-size: 2.4em;
                        color: var(--white);
                    }
                }
            }

            .note-body{
                width: 100%;
                display: flex;
                flex-direction: column;

                .top{
                    display: flex;
                    justify-content: space-between;
                    color: var(--white);
                    font-weight: 400;
                    margin: 15px 0 5px;

                    div{
                        padding: 6px 25px;
                        border-radius: 15px;
                        background-color: var(--dark-bg-1);
                    }
                }

                .text{
                    width: 100%;
                    color: var(--white);
                    font-size: 14px;
                    line-height: 2;
                    word-break: break-all;


                }
            }

            .note-bottom{
                margin-top:40px;
                width: 100%;

                .note-keywords{

                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 20px;

                    .keyword{
                        padding: 8px 20px !important;
                        width: auto;
                        max-width: 150px;
                        border-radius: 10px;
                        color: var(--white);
                        font-size: 16px;
                        margin: 0 !important;
                        font-weight: 500;
                        background-color: var(--pink-2);
                        margin: 0 auto;
                        overflow: hidden;
                        cursor: pointer;
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

    @media(max-width: 640px) {
        .wrapper{
            width: calc(100% - 40px);
            margin: 10px 20px 40px;
        }

        .placeholder{
                 display: none;
                }

    }

    @media(max-width: 500px) {
        .wrapper{
            width: calc(100% - 20px);
            margin: 10px 10px 40px;
        }


    }
`
const Note = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { notes } = useSelector((state) => state.note)
    const [mainNote, setMainNote] = useState(null)
    const [time, setTime] = useState(0)
    const [date, setDate] = useState("")
    const { noteId } = useParams()
    const { width } = useWindowDimensions()

    const { calculateReadingTime } = useCalculateReadingTime()
    const { calculateCompletionTime } = useCalculateTime()

    useEffect(() => {
        setMainNote(notes.find((item) => {
            return item._id === noteId
        }))

    }, [dispatch, noteId, notes])

    useEffect(() => {
        if (mainNote) {
            setTime(calculateReadingTime(mainNote.text))
            const { createdTime } = calculateCompletionTime(mainNote.createdAt)
            setDate(createdTime)
        }

    }, [mainNote, calculateReadingTime, calculateCompletionTime])

    return (
        <Container>
            <Helmet>
                <title>Note | Notee</title>
            </Helmet>
            <div className="wrapper">
                <main className="note-container">
                    <div className="note-top">
                        {width <= 640 &&
                            <button className="back-btn" onClick={() => navigate(-1)}>
                                <KeyboardArrowLeftRoundedIcon className="back-icon" />
                            </button>
                        }
                        <div className="placeholder" />
                        <h2>{mainNote?.title}</h2>
                        <MoreHorizIcon className="settings-icon" onClick={() => { dispatch(showModal("noteOptions")); dispatch(setDoc(mainNote)); dispatch(setNoteId(mainNote._id)) }} />

                    </div>
                    <div className="note-body">
                        <div className="top">
                            <div>{time} min read</div>
                            <div>{date}</div>
                        </div>
                        <p className="text">{mainNote?.text}</p>
                    </div>

                    <div className="note-bottom">
                        <div className="note-keywords">
                            {mainNote?.keywords.map((item, i) => (
                                <Link to="/my-notes" onClick={() => dispatch(filterByKeyword(item))} className="keyword" key={i}>{item}</Link>
                            ))}
                        </div>
                    </div>
                </main>

            </div>
        </Container>
    )
}

export default Note