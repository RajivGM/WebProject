import React ,{Component} from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './Home.css';
import images from '../../ProjectImages/ProjectImages';
import { Link } from 'react-router-dom';
import Typical from 'react-typical'


export default class HomePage extends Component{
    render(){
        return(
            <div>    
              <Header/>
                <div class="splash-container is-center">
                    <div class="splash">
                        <h1 class>
                        <p class="splash-subhead">
                         <Typical 
                        loop={Infinity}
                        wrapper="b"
                        steps={[
                            'hi',
                            1200,
                            'hello',
                            1200,
                            'HEY',
                            1200,
                            "WHAT'S UP",
                            1200,
                            "HOW'S IT GOING?",
                            1200,
                            'WELL HELLO!',
                            1200,
                            "YO, WHAT'S GOOD",
                            1200,
                            "LONG TIME NO SEE",
                            1200,
                        ]}/>
                        </p></h1>
                        <div id="custom-button-wrapper">
                            <Link to ='/login'>
                            <a class="my-super-cool-btn">
                                <div calss="dotes-container">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </div>
                                <span className="buttoncooltext">
                                    Get Start
                                </span>
                            </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="content-wrapper">
                    <div calss="content">
                        <h2 class="content-head is-center"></h2>
                        <div>
                        <div calss="content-wrapper">
                            <div clas="content">
                                <h2 class="content-head is-center">  web chat Application
                                </h2>                
                            </div>
                            <div class="AppfeaturesFounder" id="abapp">
                                    <div class="1-box-lrg is-center pure-u-1 pure-u-lg-1-5">
                                   
                                        </div>
                                            <dev class ="pure-u-1 pure-md-1-2 pure-u-lg-3-5">
                                                
                                   </dev>
                            </div>
                    </div>
                  </div>
                </div>
                </div>
          </div>
        )
    }
}