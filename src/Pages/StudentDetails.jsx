import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIHander from "../Utilities/APIHandler";
import BasicCard from "../Components/BasicCard";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import { Box, Button, TextField } from "@mui/material";

function StudentDetails() {
    const { id } = useParams();
    const [studentData, setStudentData] = useState({});
    const [updateFlag, setUpdateFlag] = useState(false);
    const [formData, setFormData] = useState({});
    const handleFormData = ({ value, name }) => {
        let tempFormInfo = { ...formData };
        tempFormInfo[name] = value;
        setFormData(tempFormInfo);
    }
    const handleStudentUpdate = async () => {
        if (updateFlag) {
            try {
                const { data } = await APIHander.patch("http://localhost:4001/student/" + id, formData);
                setStudentData(data);
                setUpdateFlag(!updateFlag);
                toast.success("Record updated successfully.")
            } catch (error) {
                toast.error("Unknown error occured.");
                setUpdateFlag(!updateFlag);
            }
        } else {
            setFormData(studentData);
            setUpdateFlag(!updateFlag);
        }
    }

    const navElements = [
        {
            label: "Home",
            link: "/"
        },
        {
            label: "New",
            link: "/new"
        }
    ]
    useEffect(() => {
        const getStudentDetail = async () => {
            try {
                const { data } = await APIHander.get("http://localhost:4001/student/" + id);
                setStudentData(data[0]);
            } catch (error) {
                toast.error("Something went wrong.")
            }
        }
        getStudentDetail();
    }, [id])
    return (
        <>
            <NavBar navElements={navElements} />
            {studentData.name && (<>
                {!updateFlag && <BasicCard title={studentData.name} secondary={studentData.gender} least={studentData.address}></BasicCard>}

                {
                    updateFlag && (<>
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
                                </Box >
                            </form>
                        </Box>
                    </>
                    )
                }

                <Button onClick={handleStudentUpdate}>{updateFlag ? "Submit" : "Update"}</Button>
            </>)}

            {!studentData.name && <h1>No Student details found.</h1>}
        </>
    )
}
export default StudentDetails;