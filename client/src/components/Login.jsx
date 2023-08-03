import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login} from '../services/api.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/header.jsx';

function Login() {
  // const [list,setList] = useState(null);
  const [form, setFrom] = useState({
    username: "",
    password: "",
  });
  const navigation = useNavigate();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('user', user)

    if (user) {
      navigation('/');
    }
  }, [navigation]);


  const handleChnage = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async () => {
    try {
      // console.log('form',form);
      const result = await login(form);
      setErrors();
      // setList();
      console.log("result", result);
      if (result.status === 200) {
        if (result.data.status === 200) {
          localStorage.setItem('user', JSON.stringify(result.data.data));
          navigation('/');
          return;
        }
        if (result.data.status === 201) {
          setErrors(result.data.data);
          toast(result.data.message);
          return;
        }
        if (result.data.status === 202) {
          toast(result.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <Header/>
      <div className='container'>
        <ToastContainer />
        <div className='row justify-content-center mt-4'>
          <div className='col-lg-5 card border-primary mt-4'>
            <div className='card-body'>
              <h4 className='card-title'>Login Now</h4>
              <div className='form-group'>
                <label htmlFor="exampleInputEmail" className='form-lable-mt-4'>
                  Email or Username
                </label>
                <input
                  type="text"
                  onChange={handleChnage}
                  name="username"
                  className='form-control'
                  id='exampleInputEmail'
                  aria-describedby='="emailHelp'
                  placeholder='Enter email or username'
                />
                {
                  errors?.username && (<small id='emailHelp' className='form-text text-danger'>
                    {errors.username.msg}
                  </small>)
                }

              </div>
              <div className='form-group'>
                <label htmlFor="exampleInputEmail" className='form-lable-mt-4'>
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChnage}
                  name="password"
                  className='form-control'
                  id='exampleInput'
                  aria-describedby='="emailHelp'
                  placeholder='Enter Password'
                />
                {
                  errors?.password && (<small id='emailHelp' className='form-text text-danger'>
                    {errors.password.msg}
                  </small>)
                }
              </div>
              <button type='button' onClick={handleSubmit} className='btn btn-primary mt-4'>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
