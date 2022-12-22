import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet-async"

const Container = styled.div`
    width: 100%;
    height: auto;

    .wrapper{
        margin:  40px 160px 80px;
        height: auto;

        h2{
            font-size:1.4rem;
            font-weight: 500;
            color: var(--pink-3);
            padding-bottom: 15px;
        }

        .activity-items{
            width: 100%;
            height: auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 30px;

            .activity-item{
                width: 45%;
                height: 200px;
                background-color: var(--scondary-bg);
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                transition: .3s;

                &:hover{
                    box-shadow:0px 0px 20px -12px var(--white);
                    -webkit-box-shadow:0px 0px 20px -7px var(--white);
                }

                .activity-item-header{
                    padding: 10px 0;
                    width: 100%;
                    text-align: center;
                    border-bottom: 1px solid var(--white);
                    color: var(--white);
                    font-size: 1.2rem;
                    font-weight: 400;
                }

                .activity-item-btn{
                    font-size: 14px;
                    padding: 5px 20px;
                    background-color: var(--pink-3);
                    border-radius: 15px;
                    color: var(--white);
                    margin: 25px 0;
                }

                .activity-item-desc, .activity-item-desc *{
                    color: var(--white);
                    font-size: 14px;
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
        .activity-items{
            flex-direction: column;
            align-items: center;
        }
        .activity-item{
            width: 100% !important;
        }
    }

    @media(max-width: 640px) {
        .activity-item:hover{
            box-shadow: none !important;
        }
    }

    @media(max-width: 500px) {
        .wrapper{
            width: calc(100% - 20px);
            margin: 40px 10px 50px;
        }
    }
`

const item = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: .4
        }
    }
}
const Home = () => {

    const { goals } = useSelector((state) => state.goal)
    const { notes } = useSelector((state) => state.note)

    return (
        <Container>
            <Helmet>
                <title>Home | Notee</title>
            </Helmet>
            <div className="wrapper">
                <h2>Activities</h2>
                <motion.div className="activity-items" >
                    <motion.div
                        className="activity-item"
                        variants={item} initial="hidden" animate="visible"
                    >
                        <h3 className="activity-item-header">You can take notes</h3>
                        <Link to="/create-note" className="activity-item-btn">
                            Take Note
                        </Link>
                        <p className="activity-item-desc">{notes.length < 1 ? "You don't have any notes yet" : <Link to="/my-notes">View all notes</Link>}</p>
                    </motion.div>
                    <motion.div variants={item} initial="hidden" animate="visible" className="activity-item">
                        <h3 className="activity-item-header">You can add a new goal</h3>
                        <Link to="/my-goals" className="activity-item-btn">
                            Add Goal
                        </Link>
                        <p className="activity-item-desc">{goals.length < 1 ? "You don't have any goals yet" : <Link to="/my-goals">View all goals</Link>}</p>
                    </motion.div>
                </motion.div>
            </div>
        </Container>
    )
}

export default Home