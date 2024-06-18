import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import APIHander from "../Utilities/APIHandler";
import NavBar from "./NavBar";
import { toast } from "react-toastify";

function NewRegistration() {
    const navElements = [
        {
            label: "Home",
            link: "/"
        }
    ]
    const [formData, setFormData] = useState({ name: "", gender: "", address: "" });
    const handleFormData = ({ value, name }) => {
        let tempFormInfo = { ...formData };
        tempFormInfo[name] = value;
        setFormData(tempFormInfo);
    }
    const handleStudentAdd = async () => {
        try {
            await APIHander.post("http://localhost:4001/student", formData);
            setFormData({ name: "", gender: "", address: "" });
            toast.success("Student registered successfully.");
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error("Some error occured.");
            }
        }

    }
    return (
        <>
            <NavBar navElements={navElements} />
            <h1>New Registration</h1>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <form>
                    <Box component="section" gap={4} sx={{ p: 2, width: "80vw", display: "flex", flexDirection: "column", border: '1px dashed grey' }}>
                        <TextField
                            id="student-name"
                            label="Student name"
                            name="name"
                            value={formData?.name}
                            onChange={(event) => {
                                handleFormData(event.target);
                            }}
                        />
                        <TextField
                            id="gender"
                            label="Gender"
                            name="gender"
                            value={formData?.gender}
                            onChange={(event) => {
                                handleFormData(event.target);
                            }}
                        />
                        <TextField
                            id="address"
                            label="Address"
                            name="address"
                            value={formData?.address}
                            onChange={(event) => {
                                handleFormData(event.target);
                            }}
                        />
                        <Button variant="contained" onClick={handleStudentAdd}>Add</Button>
                    </Box >
                </form>
            </Box>
        </>
    )
}
export default NewRegistration;