import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { PDFDownloadLink } from '@react-pdf/renderer';
import Doc from "../Doc";
import { useEffect, useState } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useLocation } from "react-router-dom"
import { showModal } from "../../features/modal/modalSlice";

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
        width:500px;
        height: auto;
        overflow-y: auto;
        border-radius: 10px;
        background-color: var(--primary-bg);
        -webkit-box-shadow: 0px 0px 15px 1px var(--white); 
        box-shadow: 0px 0px 15px 1px var(--white);
        display: flex;
        flex-direction: column;
        color: var(--white);

        &::-webkit-scrollbar{
            width: 10px;
        }

        &::-webkit-scrollbar-track{
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--grey-3);
            border-radius: 20px;
        }

        h2{
            width: 100%;
            text-align: center;
            padding: 20px 10px;
            font-weight: 600;
            font-size: 1.2em;
        }

        .options-container{
            width: 100%;
            padding: 20px;

            h3{
                font-size: 1em;
            font-weight: 600;

            }

            .options{
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-bottom: 30px;

                &:last-child{
                margin-bottom: 15px;
                    
                }


                .input{
                    width: 100%;
                    height: 40px;
                    background-color:var(--dark-bg-2);
                    color: var(--white);
                    outline:none;
                    border: 1px solid  var(--white);
                    display: inline-block;
                    border-radius: 5px;
                    font-size: 1.2em;
                    padding: 0 5px;
                    
                    .select-opt{
                        width: 60px ;
                        border-radius: 5px;
                    }
                }

                .btn{
                    padding: 10px 0;
                    margin-top: 25px;
                    width: 100%;
                    color:var(--white);
                    border-radius: 5px;
                    font-weight: 600;

                    &:first-child{
                        margin-top: 10px;
                    }
                }

                .download-btn{
                    background-color: var(--pink-2);
                }

                .cancel-btn{
                    background-color: var(--grey-3);
                }
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

const DownloadModal = () => {

    const { doc } = useSelector((state) => state.doc)
    const { modalLocation } = useSelector((state) => state.modal)
    const { lockScroll, unlockScroll } = useScrollLock();
    const location = useLocation()
    const dispatch = useDispatch()
    const [docOptions, setDocOptions] = useState({
        size: "",
        bgColor: "",
        fontColor: "",
        fontSize: ""
    })

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

    return (
        <Container>
            <div className="modal">
                <h2>Download as PDF</h2>
                <div className="options-container">
                    <div className="options">
                        <label htmlFor="size">Size</label>
                        <input type="text" id="size" className="input" value={docOptions.size} onChange={(e) => setDocOptions((prev) => ({ ...prev, size: e.target.value }))} placeholder="A3 / A4 / A5" />

                    </div>
                    <div className="options">
                        <label htmlFor="bg">Background color</label>
                        <input type="text" id="bg" className="input" placeholder="color / hex / rgba / rgba" value={docOptions.bgColor} onChange={(e) => setDocOptions((prev) => ({ ...prev, bgColor: e.target.value }))} />
                    </div>

                    <div className="options">
                        <label htmlFor="font-color">Font color <span title="loremggtr tretreter">*</span></label>
                        <input type="text" className="input" title="anan" id="font-color" placeholder="color / hex / rgba / rgba" value={docOptions.fontColor} onChange={(e) => setDocOptions((prev) => ({ ...prev, fontColor: e.target.value }))} />
                    </div>

                    <div className="options">
                        <label htmlFor="font-size">Font size</label>
                        <input type="text" className="input" id="font-size" placeholder="px / em / rem" value={docOptions.fontSize} onChange={(e) => setDocOptions((prev) => ({ ...prev, fontSize: e.target.value }))} />
                    </div>

                    <div className="options">

                        <PDFDownloadLink document={<Doc doc={doc} docOptions={docOptions} />} fileName={`${doc.title}_Notee`}>
                            <button className="btn download-btn" onClick={() => setTimeout(() => dispatch(showModal(null)), 200)}>Download</button>
                        </PDFDownloadLink>
                        <button className="btn cancel-btn" onClick={() => dispatch(showModal(null))}>Cancel</button>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default DownloadModal