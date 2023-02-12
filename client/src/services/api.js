import axios from 'axios';
import { CREATETODO, LIST, LOGIN, REGISTER,DELETE } from './apiConstatnts.js';
export const login = async(data)=>{
    return axios.post(LOGIN,data)
};

export const register = async(data)=>{
    return axios.post(REGISTER,data)
};

export const createTodo = async(data,token)=>{
    console.log("create todo data",data);
    let config = {
        headers: {
          auth: token,
        }
      }
      config.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    return axios.post(CREATETODO,data,config)
};

export const ListTodo = (token,setList)=>{
    // console.log("create todo data",data);
    let config = {
        headers: {
          auth: token,
        }
      }
    config.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    axios.get(LIST,config)
    .then((data)=>{
        console.log("api",data.data.data.todos);
        setList(data.data.data.todos);
        // return data;
    })
};

export const DltTodo = async(data,token)=>{
    console.log("create todo data",token);
    let config = {
        headers: {
          auth: token,
        }
      }
      config.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    return axios.post(DELETE,data,config)
};