import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
import {Card} from 'react-bootstrap';
import firebase from '../../Services/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typegraphy from '@material-ui/core/Typography';

import LoginString from '../Login/LoginStrings';

export default class Signup extends Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            name:"",
            error:null
        }
        this.handlechange=this.handlechange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handlechange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

   async handleSubmit(event){
       const {name,password,email}=this.state;
       event.preventDefault();
       try{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async result =>{
            firebase.firestore().collection('users')
            .add({
                name,
                id:result.user.uid,
                email,
                password,
                URL:'',
                description:'',
                messages:[{notificationId:"",number:  0}]
                 }).then((docRef)=>{
                localStorage.setItem(LoginString.ID,result.user.uid);
                localStorage.setItem(LoginString.Name,name);
                localStorage.setItem(LoginString.Email,email);
                localStorage.setItem(LoginString.Password,password);
                localStorage.setItem(LoginString.PhotoURL,"");
                localStorage.setItem(LoginString.UPLOAD_CHANGED,'state_changed');
                localStorage.setItem(LoginString.Description,"");
                localStorage.setItem(LoginString.FirebaseDocumentID,docRef.id);
                this.setState({
                    name:'',
                    password:'',
                    url:'',
                });
                this.props.history.push("/chat")

            }) 
            .catch((error)=>{
                console.error("Error adding Document",error);
                document.getElementById('1').innerHTML="Error in Signing UP please try again"
            })
        })   
       }
       catch(error)
       {
           document.getElementById('1').innerHTML="Error in Signing UP please try again"

       }
   }
    render()
    {
        const Singinesee = {
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:'#1ebea5',
            widthp:'100%',
            boxShadow:" 0 5px 5px #808888",
            height:"10rem",
            paddingTop:"48Px",
            Opactiy:"0.5",
            borderBottom:'5px solid green',
        }
        
        return(
            
            <div>
                <CssBaseline/>
                <Card style={Singinesee}>
                    <div>
                    <Typegraphy component="h1"variant="h5">
                        Sign Up To
                    </Typegraphy>
                    </div>
                    <div>
                        <Link to="/">
                            <button class="btn "><i class="fa fa-home"></i>WebChat</button>
                        </Link>
                    </div>
                </Card>
                <Card className="formacontrooutside">
                    <form class="customform" noValidate onSubmit={this.handleSubmit}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address-example:abe@gmail.com"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.email} 
                        />
                        <div>
                          <p style={{color:'black',fontSize:'15px',marginLeft:'0'}}></p>
                        </div>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.password} 
                        />
                         <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Your Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.name} 
                        />
                        <div>
                          <p style={{color:'grey',fontSize:'15px',marginLeft:'0'}}> </p>
                        </div>
                        <div className="CenterAliningItems">
                            <button class="button1 customhandlefile" type="submit">
                                <span>Sign up</span>
                            </button>
                        </div>
                        <div>
                            <p style={{color:'grey'}}>Alredy have a account?</p>
                            <Link to="/login">
                                Login In
                            </Link>
                        </div>
                        <div className="error">
                            <p id='1' style={{color:'red'}}></p>
                        </div>
                    </form>
                </Card>
            </div>
        )
    }
}