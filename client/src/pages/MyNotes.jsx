import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { filterByKeyword } from "../features/note/noteSlice"
import NoteItem from "../components/NoteItem"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Helmet } from "react-helmet-async"

const Container = styled.div`
    width: 100%;
    height: auto;

    .wrapper{
        margin: 40px 160px;
        width: calc(100% - 320px);
        height: auto;
        margin-bottom: 80px;

        .header{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;

            .filter-container{
                width: 80%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .input-search{
                    width: 100%;
                    padding: 12px 20px;
                    border-radius: 10px;
                    background-color: var(--scondary-bg);
                    color: var(--white);
                    font-size: 14px;
                    font-weight: 600;
                    &::placeholder{
                        color: #b8b6b6;

                    }
                }

                .filtered-keyword{
                    width: 100%;
                    margin: 20px 0 0 0;

                    .keyword-btn{
                        padding: 10px 20px;
                        background-color: #067eb5;
                        border-radius: 10px;
                        color: var(--white);
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        
                        span{
                            font-size: 16px;
                            line-height: 100%;
                            padding-right: 6px;
                            font-weight: 600;
                        }

                        .remove-icon{
                            font-size: 1.3rem;

                        }

                    }
                }
            }
  

            .navigate{
                padding: 10px 20px;
                color: var(--white);
                text-align: center;
                background-color: var(--pink-3);
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;

            }
        }

        .notes{
            -webkit-box-shadow: 0px 0px 5px 0px var(--white); 
            box-shadow: 0px 0px 5px 0px var(--white);
            border-radius: 10px;
            width: 100%;
            height: auto;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .notes-length{
                color: var(--blue-1);
                font-size: 1.4rem;
                font-weight: 500;
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
        .filter-container{
            width: 70% !important;
        }

    }
    @media(max-width: 640px) {
        .header{
            margin-bottom: 10px !important;
        }
        .filter-container{
            width: 60% !important;
        }
        .notes{
            box-shadow: none !important;
            padding: 0 !important;
        }
    }

    @media(max-width: 540px) {
        .wrapper{
            margin-bottom:  40px;
        }
    }

    @media(max-width: 500px) {
    .wrapper{
            width: calc(100% - 20px);
            margin: 40px 10px 50px;
        }

}

@media(max-width: 420px) {
    .wrapper{
            width: calc(100% - 20px);
            margin: 40px 10px 50px;
        }

        .header{
            flex-direction: column-reverse;
            gap: 15px;

        }

        .header > *, .input-search {
            width: 100% !important;
            text-align: center;

        }

        .filtered-keyword{
            margin: 20px 0 !important;
        }

}
`

const MyNotes = () => {
    const [query, setQuery] = useState("")
    const { notes, filteredKeyword, isLoading } = useSelector((state) => state.note)
    const dispatch = useDispatch()
    const [displayed, setDisplayed] = useState(notes)

    const keys = ["title", "text"]


    useEffect(() => {

        let filtered;
        filtered = notes.filter((item) => {
            return keys.some((key) => item[key].includes(query))
        })

        if (filteredKeyword) {
            setDisplayed(filtered.filter((item) => {
                return item.keywords.some((kw) => kw === filteredKeyword)
            }))

        }
        else {
            setDisplayed(filtered)
        }

        // eslint-disable-next-line
    }, [notes, query, filteredKeyword])

    return (
        <Container>
            <Helmet>
                <title>My Notes | Notee</title>
            </Helmet>
            <div className="wrapper" >
                <div className="header">
                    <div className="filter-container">
                        <input type="text" className="input-search" placeholder="Search Note" value={query} onChange={(e) => setQuery(e.target.value)} />
                        {filteredKeyword &&
                            <div className="filtered-keyword">
                                <button className="keyword-btn" onClick={() => dispatch(filterByKeyword(null))}>
                                    <span>{filteredKeyword}</span>
                                    <HighlightOffIcon className="remove-icon" />
                                </button>
                            </div>
                        }
                    </div>
                    <Link to="/create-note" className="navigate">Create note</Link>
                </div>

                <div className="notes">
                    {!isLoading &&
                        <div className="notes-length">{`${displayed.length} ${displayed.length > 1 ? "notes" : "note"}`}</div>
                    }
                    {displayed.map((item) => (
                        <NoteItem note={item} key={item._id} />
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default MyNotes