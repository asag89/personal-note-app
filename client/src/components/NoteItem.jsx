import { Link } from "react-router-dom"
import styled from "styled-components"
import { filterByKeyword } from "../features/note/noteSlice"
import { useDispatch } from "react-redux"

const Container = styled.div`
    width: 100%;
    height:246px;
    border-radius: 10px;
    background-color: var(--scondary-bg);
    margin: 25px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .router{
        width: 100%;
        height: 113px;
        color: var(--white);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: .5s;

        .top{
            width: 100%;
            height: auto;
            border-bottom: 1px solid var(--white);

            .title{
                margin: 15px 20px;
                text-align: center;
                font-weight: 400;
                font-size: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                text-transform: capitalize;
            }
        }

        .content{
            width: 100%;
            height: auto;

            .text{
                margin: 25px 20px;
                overflow: hidden;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                font-size: 14px;
                text-align: justify;

            }
        }
    }

    .keywords{
        width: 100%;
        height: 55px;
        border: solid 1px transparent;
        border-top: solid 1px var(--white);

        padding: 10px;
        display: flex;
     
        .keyword-filter{
            padding: 8px 20px !important;
            width: auto;
            max-width: 250px;
            border-radius: 10px;
            color: var(--white);
            font-size: 16px;
            font-weight: 500;
            background-color: var(--pink-3);
            margin: 0 auto;
            overflow: hidden;
            cursor: pointer;
        }
    }

    @media(max-width: 640px) {
        margin: 15px 0;
    }

    @media(max-width: 500px) {
        .title{
            margin: 10px !important;
        }
        .text{
            margin: 5px !important;
        }
    }
`

const NoteItem = ({ note }) => {

    const dispatch = useDispatch()

    return (
        <Container>
            <Link to={`/note/${note._id}`} className="router">
                <div className="top">
                    <div className="title">
                        {note.title}
                    </div>
                </div>
                <div className="content">
                    <div className="text">
                        {note.text}
                    </div>
                </div>
            </Link>
            <div className="keywords" >
                {note.keywords.map((item, i) => (
                    <button title="filter" className="keyword-filter" onClick={() => dispatch(filterByKeyword(item))} key={i}>{item}</button>
                ))}
            </div>

        </Container>
    )
}

export default NoteItem