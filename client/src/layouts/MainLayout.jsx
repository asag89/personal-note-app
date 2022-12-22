
import { Outlet, useLocation } from "react-router-dom"
import WideScreenNavbar from "../components/WideScreenNavbar"
import styled from "styled-components"
import Header from "../components/Header"

import CreateGoalModal from "../components/modals/CreateGoalModal"
import { useDispatch, useSelector } from "react-redux"
import { getNotes } from "../features/note/noteSlice"
import { useEffect } from "react"
import NoteOptionsModal from "../components/modals/NoteOptionsModal"
import DownloadModal from "../components/modals/DownloadModal"
import ConfirmModal from "../components/modals/ConfirmModal"
import GoalOptionsModal from "../components/modals/GoalOptionsModal"
import useWindowDimensions from "../hooks/useWindowDimension"
import MobileNavbar from "../components/MobileNavbar"
import { setPage } from "../features/doc/docSlice"
import { getGoals } from "../features/goal/goalSlice"
const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;

    .main{
        margin-left: 100px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    @media(max-width: 810px) {
        .main{
            margin-left: 80px;
        }

    }

    @media(max-width: 640px) {
        .main{
            margin-left: 0;
            margin-bottom: 55px;
        }

    }


`
const MainLayout = () => {
    const { modalType } = useSelector((state) => state.modal)
    const dispatch = useDispatch()
    const { width } = useWindowDimensions();
    const location = useLocation().pathname
    useEffect(() => {
        dispatch(getNotes())
        dispatch(getGoals())

    }, [dispatch])

    useEffect(() => {
        dispatch(setPage(location))
    }, [dispatch, location])
    return (
        <Container>
            {
                modalType === "createGoal" && <CreateGoalModal />
            }
            {
                modalType === "noteOptions" && <NoteOptionsModal />
            }

            {
                modalType === "goalOptions" && <GoalOptionsModal />
            }

            {
                modalType === "pdf" && <DownloadModal />
            }

            {
                modalType === "confirm" && <ConfirmModal />
            }

            {width <= 640 ? <MobileNavbar /> :
                <WideScreenNavbar />
            }
            <div className="main">
                {((width > 640) || (width <= 640 && !location.startsWith("/note/"))) &&
                    <Header />
                }
                <Outlet />
            </div>
        </Container>
    )
}

export default MainLayout