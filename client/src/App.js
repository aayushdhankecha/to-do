// import logo from './logo.svg';
// import Header from './components/partials/header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';
function App() {
  const info = localStorage.getItem('user');
  const [user,setUser] = useState(JSON.parse(info));

  return (
    <>
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
