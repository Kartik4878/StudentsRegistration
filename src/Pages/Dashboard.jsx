import { useEffect, useState } from "react";
import APIHander from "../Utilities/APIHandler";
import BasicTable from "../Components/BasicTable";
import NavBar from "./NavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const navElements = [

        {
            label: "New",
            link: "/new"
        }
    ]

    const [studentsList, SetStudentsList] = useState([]);
    useEffect(() => {
        const getStudents = async () => {
            try {
                const { data } = await APIHander.get("http://localhost:4001/student");
                SetStudentsList(data);
            } catch (error) {
                console.log(error);
                toast.error("Some error occured.")
            }
        }
        getStudents();

    }, []);
    const handleDelete = async (id) => {
        let tempStudentList = [...studentsList];
        let newStudentsList = studentsList.filter((student) => student._id !== id);
        SetStudentsList(newStudentsList);
        try {
            const { data } = await APIHander.delete("http://localhost:4001/student/" + id);
            toast.error(data.name + " removed.");
        } catch (error) {
            SetStudentsList(tempStudentList);
            console.log(error);
        }
    }
    const handleItemAction = (id) => {
        navigate("/student/" + id);
    }

    const labels = ["", "ID", "Name", "Gender", "Address", "Misc"];
    return (
        <>
            <NavBar navElements={navElements} />
            <h1>Registered Students</h1>
            {studentsList && <BasicTable labels={labels} data={studentsList} actionLabel={"Delete"} ItemAction={handleItemAction} rowAction={handleDelete} />}
        </>
    )
}
export default Dashboard;