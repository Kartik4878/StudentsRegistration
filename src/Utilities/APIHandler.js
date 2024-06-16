import axios from "axios";


const APIHander = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete
}

export default APIHander;