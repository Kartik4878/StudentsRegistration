import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthContext';
import { toast } from 'react-toastify';


function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFormData = ({ value, name }) => {
        let tempFormInfo = { ...formData };
        tempFormInfo[name] = value;
        setFormData(tempFormInfo);
    }

    const handleLogin = () => {
        setFormData({ username: "", password: "" });
        login(JSON.stringify(btoa(formData.username + ":" + formData.password)));
        toast.success("Logged in successfully.")
        navigate("/");
    }
    return (
        <>
            <h1>Login</h1>
            <Box sx={{ display: "flex", justifyContent: "center" }}>


                <form>
                    <Box component="section" gap={4} sx={{ p: 2, maxWidth: "80vw", display: "flex", flexDirection: "column", border: '1px dashed grey' }}>
                        <TextField
                            id="login-username"
                            label="Username"
                            name="username"
                            value={formData?.username}
                            onChange={(event) => {
                                handleFormData(event.target);
                            }}
                        />
                        <TextField
                            id="login-password"
                            label="Password"
                            type="password"
                            name="password"
                            value={formData?.password}
                            onChange={(event) => {
                                handleFormData(event.target);
                            }}
                        />
                        <Button variant="contained" onClick={handleLogin}>Submit</Button>
                    </Box >
                </form>
            </Box >

        </>
    )
}

export default Login;