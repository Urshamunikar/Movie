import React, {useState, useEffect} from 'react'
import './Nav.css';
import logo from './img/netflix-logo.png';
import avatar from './img/netflix-avatar.png';

function Nav() {
    const [show, handleShow] = useState(false);
    // when we need a piece of code under certain condition
    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        });
        // removing event listener so that we dont get like hundred of eventlistener
        return () => {
            window.removeEventListener("scroll");
        }
       
    }, [])


    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav_logo"
            src={logo}
            alt="Netflix Logo"
            />
            <img className="nav_avatar"
            src={avatar}
            alt="Netflix avatar"/>


            
        </div>
    );
}


export default Nav;