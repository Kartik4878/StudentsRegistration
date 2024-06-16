import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { toast } from 'react-toastify';




function ElevationScroll(props) {
    const { children } = props;
    return React.cloneElement(children, {
        elevation: 0,
    });
}

export default function NavBar(props) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();



    const handleLogout = () => {
        logout();
        localStorage.removeItem("token");
        navigate("/login");
        toast.error("Logged out successfully.")
    }

    return (
        <>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" component="div">
                            Student registraton
                        </Typography>
                        <Box>
                            {
                                props.navElements.map(({ label, link }) => <Button sx={{ background: "white", margin: "1rem" }} variant="contained"> <Link to={link}>{label}</Link></Button>)
                            }
                            <Button sx={{ background: "red" }} variant="contained" onClick={handleLogout}>Logout</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </>
    );
}
