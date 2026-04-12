import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    withCredentials: true
})

export default Axios