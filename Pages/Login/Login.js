import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../Services/firebase';
import LoginString from '../Login/LoginStrings';
import './Login.css';
import {Card} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import  TextField from '@material-ui/core/TextField';
import FromControlLable from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { onLog } from 'firebase';

export default class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            isLoading : true,
        
            email : "",
            password : ""            
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        
    }
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    componentDidMount(){
        if(localStorage.getItem(LoginString.ID))
        {
            this.setState({isLoading:false},()=>
            {
                this.setState({isLoading  : false})
                this.props.ShowToast(1, "Login Succes")
                this.props.history.push('./chat')
            })  
        }else{
            this.setState({isLoading:false})

        }
    }
    async  handleSubmit(event)
    {
        event.preventDefault();
        this.setState({error:""})
        await firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(async result=>{
            let user=result.user;
            if(user){
                await firebase.firestore().collection('users')
                .where('id',"==",user.uid)
                .get() 
                .then(function(querySnapshot){
                querySnapshot.forEach(function(doc)
                {
                    const currentdata=doc.data();
                    localStorage.setItem(LoginString.FirebaseDocumentID,doc.id);
                    localStorage.setItem(LoginString.ID,currentdata.id);
                    localStorage.setItem(LoginString.Name,currentdata.name)
                    localStorage.setItem(LoginString.Email,currentdata.email)
                    localStorage.setItem(LoginString.Password,currentdata.password)
                    localStorage.setItem(LoginString.PhotoURL,currentdata.URL)
                    localStorage.setItem(LoginString.Description, currentdata.description)

                })      
                   
                })
               
            }
            this.props.history.push('./chat')
        }).catch(function(error)
        {
            document.getElementById('1').innerHTML="incorrect email/password or No Internet Conection "
        })

    }
    render()
    {
        const paper = 
        {
            display:'flex',
            flexDirection:'column',
            alignItem:'center',
            paddingLeft:'5px',
            paddingRight:'10px',  
          }

          const rightcomponent =
           {
              boxShadow:"0 80px 80px #80888",
              backgroundColor:'smokegrey',

          }

          const root=
          {
              height:'100vh',
              background:"linear-gradient(90deg, #e3ffe7 0%,#d9e7ff 100%)",
             marginBottom:'50px'
            }

            const Singinesee = 
            {
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                marginBottom:'20px',
                color:'white',
                backgroundColor:"#1ebea5",
                width:'100%',
                boxShadow:" 0 5px 5px #808888",
                height:"100%",
                paddingTop:"48Px",
                Opactiy:"0.5",
                borderBottom:'5px solid green',
                
            }

            const from={
                width:'100%',
                marginTop:'50Px'
            }
            const avatar=
            {
                backgroundColor:'green',
                alignItems:'center',
            }

        return(
            <Grid container component="main" style={root}>
                <CssBaseline/>
                <Grid item xs={1} sm={4} md={7} className="image">
                    <div className="image1"></div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} style={rightcomponent} elevation={6}  >

                    <Card className="bgcolor" Style={Singinesee}>
                        <div class="CenterAliningItems">
                            <Avatar style={avatar} >
                                    <LockOutLinedIcon width="50px" height="50px"/>
                            </Avatar>
                        </div>
                        <div  class="CenterAliningItems">
                            <Typography component="h1" variant="h5" >
                            Sign in
                            To
                            </Typography>
                        </div>
                        <div>
                            <Link to="/" class="CenterAliningItems">
                                <button type="button" class="btn">
                                    <i class="fa fa-home"> </i>
                                        WebChat
                                </button>
                            </Link>
                        </div>
                    </Card>
                    
                    <div Style={paper}>
                        <form style={from} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleChange}
                        value={this.state.email} 
                        />
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
                        onChange={this.handleChange}
                        value={this.state.password} 
                        />
                        <FromControlLable control={<Checkbox value="remember" color="primary"/> }
                        label="Remeber me"
                        />
                        <Typography component="h6" variant="h5">
                        {this.state.error ?(
                            <p className="text-danger">{this.state.error}</p>
                        ):null} 
                        </Typography>
                       
                            <div className="CenterAliningItems">
                                <button class="button1" type="Submit">
                                    <span>Login</span>
                                </button>
                            </div>
                            <div className="CenterAliningItems">
                                <p>Don't have and account ?
                                <Link to="/Signup" variant="body2">
                                    Sign Up
                                </Link></p>
                            </div>
                            <div className="error" >
                                <p id='1' style={{color:'red'}}></p>
                            </div>
                        </form>
                    </div>
                </Grid> 
            </Grid>
        )
    }    
}  