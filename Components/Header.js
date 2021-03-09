import React from 'react';
import './Header.css';

import images from '../ProjectImages/ProjectImages';

import {Link} from 'react-router-dom';
function Header(){
    return(<div class="fixed-top">
        <header class="header-login-signup">
            <div class="header-limiter center">
             
             <h1><Link to="/">  <img  height="60" width="60" alt="File Icons" class="navbar-brand " src={images.logo}/> </Link>
                <Link to="/"> <a href="/">Web<span>Chat</span></a></Link> </h1>
                <nav>
                    <Link to="/"> Home</Link>
                    <a class="selected"><Link to="#abapp">About App</Link></a>
                    <a ><Link to="/">Contact Us</Link></a>
                </nav>  
                <ul>
                    <li><Link to="/login"><button type="button" class="log ">Login</button></Link></li>
                    <li><Link to="/signup"><button type="button" class="log ">Sign Up</button></Link></li>
                </ul>
            </div>
        </header>
     </div>
    )
}
export default Header