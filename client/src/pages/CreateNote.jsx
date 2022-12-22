
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { createNote } from "../features/note/noteSlice"
import Spinner from "../components/Spinner"
import { Helmet } from 'react-helmet-async'

const Container = styled.div`
    width: 100%;
    height: auto;

    .wrapper{
        margin: 40px 160px 80px;
        width: calc(100% - 320px);
        height: auto;
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 5px 0px var(--white); 
        box-shadow: 0px 0px 5px 0px var(--white);

        h2{
            font-size:1.4rem;
            font-weight: 500;
            color: var(--pink-1);
            padding-bottom: 15px;
        }

        .form{
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 40px 20px;
            
            .form-header{
                width: 100%;
                display: flex;
                justify-content: center;

                .input-title{
                    width: 280px;
                    padding: 10px 15px;
                    background-color: var(--dark-bg-2);
                    color: var(--white);
                    border-radius: 5px;
                    font-size: 1.4rem;
                    font-weight: 600;
                    border: 1px solid transparent;
                    border-bottom-color: var(--white);

                    &:focus{
                        border: 1px solid var(--white);
                    }
                }     
            }
            .content-container{
                width: 100%;
                margin: 40px 0;

                textarea{
                    resize: horizontal;
                    width: 100%;
                    resize: vertical;
                    min-height: 200px;
                    max-height:800px;
                    border-radius: 5px;
                    background-color: var(--dark-bg-2);
                    border: 1px solid transparent;
                    border-bottom-color: var(--white);
                    color: var(--white);
                    font-size: 16px;
                    padding: 20px;
                    line-height: 1.6;

                    &:focus{
                        border: 1px solid var(--white);
                    }
                }
            }
            .form-footer{
                width: 100%;
                display: flex;
                margin-bottom:  40px;
                justify-content:space-between;

                .keywords-container{
                    width: auto;
                    display: flex;
                    gap: 10px;

                    input{
                        width: 120px;
                        padding: 8px 15px;
                        background-color: var(--dark-bg-2);
                        border: 1px solid transparent;
                        border-bottom-color: var(--white);
                        border-radius: 5px;
                        color: var(--white);
                        font-size: 14px;

                        &:focus{
                        border: 1px solid var(--white);
                        }
                    }

                    .add-btn{
                        background-color: var(--blue-3);
                        color: var(--white);
                        padding: 8px 15px;
                        font-size: 14px;
                        width: auto;
                        border-radius: 5px;
                        margin-left: 20px;
                    }
                }

                .submit-btn{
                    color: var(--white);
                    padding: 8px 15px;
                    font-size: 14px;
                    background-color: var(--pink-2);
                    width: 100px;
                    border-radius: 5px;
                    cursor: pointer;

                    &:disabled{
                        background-color: var(--pink-1);
                        cursor: auto;
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

    @media(max-width: 840px) {
        .keywords-container{
            flex-direction: column;
            gap: 20px !important;
        }
        .add-btn{
            margin-left: 0 !important;
        }
    }

    @media(max-width: 640px) {
        .wrapper{
            margin-bottom: 40px;
            box-shadow: none !important;
        }
        .form{
            padding: 0 !important;
        }
        .input-title{
            width: 100% !important;
        }

    }

    @media(max-width: 500px) {
        .wrapper{
            width: calc(100% - 20px);
            margin: 40px 10px 50px ;
        }
    }
`
const CreateNote = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const { isLoading } = useSelector((state) => state.note)
    const [keywords, setKeywords] = useState({
        keyword1: "",
        keyword2: "",
        keyword3: "",
    })
    const { keyword1, keyword2, keyword3 } = keywords
    const [showBtn, setShowBtn] = useState(false)
    const [btn, setBtn] = useState(0)

    useEffect(() => {
        if (btn === 0 && keyword1) {
            setShowBtn(true)
        }
        else if (btn === 1 && keyword1 && keyword2) {
            setShowBtn(true)

        }
        else if (btn === 1 && !keyword1) {
            setShowBtn(true)
            setBtn(0)
        }
        else if (btn === 2 && !keyword1) {
            setShowBtn(true)
            setBtn(1)
        }
        else if (btn === 2 && !keyword2) {
            setShowBtn(true)
            setBtn(1)
        }
        else {
            setShowBtn(false)
        }
    }, [btn, keyword1, keyword2, keyword3])

    const handleSubmit = (e) => {
        e.preventDefault()
        const keywords = [keyword1, keyword2, keyword3]

        const filledKeywords = keywords.filter((item) => {
            return item !== ""
        })
        dispatch(createNote({ title, text, keywords: filledKeywords }))

        if (!isLoading) {
            navigate("/my-notes")

        }
    }
    return (
        <Container>
            <Helmet>
                <title>Create Note | Notee</title>
            </Helmet>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="form">
                    <h3 className="form-header">
                        <input value={title} className="input-title" onChange={(e) => setTitle(e.target.value)} />
                    </h3>
                    <div className="content-container">
                        <textarea cols="30" rows="10" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    </div>
                    <div className="form-footer">
                        <div className="keywords-container">
                            <input type="text" value={keyword1} onChange={(e) => setKeywords((prev) => ({ ...prev, keyword1: e.target.value }))} />
                            {(keyword1 && btn > 0) &&
                                <input type="text" value={keyword2} onChange={(e) => setKeywords((prev) => ({ ...prev, keyword2: e.target.value }))} />
                            }
                            {(keyword2 && btn > 1) &&
                                <input type="text" value={keyword3} onChange={(e) => setKeywords((prev) => ({ ...prev, keyword3: e.target.value }))} />
                            }
                            {showBtn &&
                                <button type="button" className="add-btn" onClick={() => setBtn((prev) => prev + 1)}>Add keywords</button>
                            }
                        </div>
                        <div className="submit-container">
                            <button type="submit" className="submit-btn" disabled={!title || !text || (!keyword1 & !keyword2 && !keyword3)}>{isLoading ? <Spinner /> : "Submit"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default CreateNote