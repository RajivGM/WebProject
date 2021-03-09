import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
  
} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Chat from './Pages/Chat/Chat';
import Profile from './Pages/Profile/Profile';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import firebase from './Services/firebase';
import {toast,ToastContainer} from 'react-toastify';

class App extends Component 
{
  ShowToast = (type,message) =>{
    switch (type){
      case 0:
        toast.warning(message) 
        break;
        case 1:
          toast.success(message)
          break;
          default:
            break;
    }
  }
  constructor(){
    super();
    this.state={
      authenticated:false,
      loading:true
    };
  }
 
    render(){
      return (
        <Router>
          <ToastContainer autoClose ={2000}
          hideProgressBar={true}
          position={toast.POSITION.BOTTOM_CENTER}
          />
          <Switch>
            <Route
            exact
            path="/"
            render = { props=> <Home {...props}/>}/>
            <Route
            path="/Login"
            render = { props => <Login ShowToast={this.ShowToast}{...props}/>}
            />
            <Route
            path="/Profile"
            render = { props => <Profile ShowToast={this.ShowToast}{...props}/>}
            />

            <Route
            path="/Signup"
            render = { props => <Signup ShowToast={this.ShowToast}{...props}/>}
            />

            <Route
            path="/chat"
            render = { props => <Chat ShowToast={this.ShowToast}{...props}/>}
            />
          </Switch>
        </Router>
      )
    }
  }
  export default App 
   




