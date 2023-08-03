import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { createTodo, DltTodo, ListTodo } from '../services/api';
import Header from './partials/header'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [todo, setTodo] = useState({
    desc: "",
  });
  const [list,setList] = useState([]);
  const u = JSON.parse(localStorage.getItem('user'));
  const navigation = useNavigate();
  if(u===undefined || u===null){
    navigation('/login');
  }
  const handleInputChnage = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  };
  const [todoId,settodoId] = useState({
    todo_id:"",
  });
  
  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('user'))
    // console.log(u);
    if(u===undefined || u===null){
      navigation('/login');
    }
    else{
      // u = {
      //   token:u.token,
      // }
      ListTodo(u.token,setList);
    }
  },[]);
  
  const submitTodo = async () => {
    try {
      const u = JSON.parse(localStorage.getItem('user'));
      // setList();
      if (u) {
        const result = await createTodo(todo, u.token);
        if (result.status === 200) {
          if (result.data.status === 200) {
            // console.log(result.data.data);
            // console.log("myList arr",arr);
            ListTodo(u.token,setList);
            // console.log(u.token,list);
            return;
          }
          if (result.data.status === 202) {
            toast(result.data.message);
            return;
          }
        }
        else {
          toast('something went wrong, Please try again!')
        }
      }
    }
    catch (err) {
      console.log("err todo", err);
    }

  };
  const rmv = async (val)=>{
    // console.log("dlt",val);
    const u = JSON.parse(localStorage.getItem('user'));
    // console.log(u.token,val._id);
    // await settodoId({todo_id:val._id});
    let ok={todo_id:val._id};
    // console.log(ok);
    const xx = await DltTodo(ok,u.token);
    // console.log(xx);
    await ListTodo(u.token,setList);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <ToastContainer />
        {/* {tmp()} */}
        <div className="row justify-content-md-center mt-4">
          {
            list.map((val)=> {return (<div className='col-sm-3 mx-3 my-2 alert bg-light'>
            <div className="card-header">
              Header
            </div>
            <div className="card-body">
              <p className="card-text">{val.desc}</p>
            </div>
            <div className="card-footer">
            <FontAwesomeIcon icon={faTrash} onClick={()=>{rmv(val)}}/>
            </div>
          </div>)})
          }
        </div>
      </div>
      <div className='' style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
        <button type="button"
          data-bs-toggle="modal"
          data-bs-target="#examplemodal"
          className='btn btn-outline-light'>
          Add
        </button>
      </div>
      <div className="modal mt-5" id="examplemodal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                Add new Todo
              </div>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss="modal"
                aria-label="close">
                <span arial-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className='form-group'>
                <input name="desc"
                  className='form-control'
                  rows={3}
                  onChange={handleInputChnage}
                  placeholder="Enter todo details....."
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button className='btn btn-secondary' data-bs-dismiss="modal">
                Close
              </button>
              <button className='btn btn-secondary' onClick={submitTodo} data-bs-dismiss="modal">
                Save Todo
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
