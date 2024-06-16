import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIHander from "../Utilities/APIHandler";
import BasicCard from "../Components/BasicCard";
import { toast } from "react-toastify";
import NavBar from "./NavBar";

function StudentDetails() {
    const { id } = useParams();
    const [studentData, setStudentData] = useState({});
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
            {studentData.name && <BasicCard title={studentData.name} secondary={studentData.gender} least={studentData.address}></BasicCard>}
            {!studentData.name && <h1>No Student details found.</h1>}
        </>
    )
}
export default StudentDetails;