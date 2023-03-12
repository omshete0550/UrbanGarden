import React, { useEffect } from 'react';
import './NavbarStyles.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../UGbg.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
    useEffect(() => {
        AOS.init({ duration: 3000 })
    }, []);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    const handleClick = (e) => {
        console.log("hey")
        dispatch(logOut());
        console.log("hey1")
    };
    return (
        <>
            <section className="nav" >
                <div className="navbar">
                    <div className="logo">
                        <img src={logo} width="80" height="80" onClick={handleClick}></img>
                        <h1 style={{ color: "#00743c" }}>Urban <br></br> Garden</h1>
                    </div>

                    <div className="links" >
                        {!user &&
                            <Link to='/NurseryInfo'>
                                <div>Add a Nursery</div>
                            </Link>}
                        {!user &&
                            <Link to='/Login'>
                                <div>Log In</div>
                            </Link>}
                        {!user &&
                            <Link to='/Register'>
                                <div>Sign Up</div>
                            </Link>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Navbar