
import axios from 'axios';

export const instance = axios.create({
    baseURL: "https://book-my-show-project-three.vercel.app",
    withcredentials : true,
    headers : {
        'content-type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
})

