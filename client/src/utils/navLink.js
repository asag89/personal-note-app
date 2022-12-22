
import { AiOutlineHome } from "react-icons/ai"
import { BsFileText, BsPencilSquare } from "react-icons/bs"
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const navLink = [
    {
        id: 1,
        svg: <AiOutlineHome className="icon" />,
        path: "/"
    },
    {
        id: 2,
        svg: <BsFileText className="icon" />,
        path: "/my-notes"
    },
    {
        id: 4,
        svg: <BsPencilSquare className="icon sm-icon" />,
        path: "/create-note"
    },
    {
        id: 5,
        svg: <TaskAltIcon className="icon" />,
        path: "/my-goals"
    }
]

export default navLink