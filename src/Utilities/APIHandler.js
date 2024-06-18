import axios from "axios";


const APIHander = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch
}

export default APIHander;