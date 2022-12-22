
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = ({ size }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress sx={{ color: "#fff", margin: "auto" }} size={size} />
        </Box>
    );
}

export default Spinner