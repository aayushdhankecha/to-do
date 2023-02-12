import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigation = useNavigate();
    useEffect(() => {
        const u = localStorage.getItem('user');
        setUser(u);
    }, [navigation]);
    const handleLogout = () => {
        localStorage.clear();
        console.log("ok");
        redirect('/navigation')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TODO APP</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home
                                <span className="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        {
                            user && (<li className="nav-item">
                                <Link className="nav-link" onClick={handleLogout} to="/login">Logout</Link>
                            </li>)
                        }

                    </ul>
                    {/* <form className="d-flex">
                        <input className="form-control me-sm-2" type="search" placeholder="Search" />
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    );
}

export default Header;
