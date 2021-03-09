import React from 'react';
//import ImgUpload from 'react-images-uploading'
import './Profile.css';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';
import LoginString from '../Login/LoginStrings';

export default class Profile extends React.Component
{
    
    constructor(props){
        super(props);
        this.state={
            
            isLoding:false,
            documentkey:localStorage.getItem(LoginString.FirebaseDocumentID),
            id:localStorage.getItem(LoginString.ID),
            name:localStorage.getItem(LoginString.Name),
            aboutMe:localStorage.getItem(LoginString.Description),
            photoUrl:localStorage.getItem(LoginString.PhotoURL),          

        }
        this.newPhoto=''
        this.newPhotoUrl=""
        this.onChangeAboutMe=this.onChangeAboutMe.bind(this);
        this.onChangeAvatar=this.onChangeAvatar.bind(this);
        this.onChangeNickname=this.onChangeNickname.bind(this);
        this.uploadAvatar=this.uploadAvatar.bind(this);
        this.updateUserInfo=this.updateUserInfo.bind(this); 
    }

    componentDidMount(){
        if(!localStorage.getItem(LoginString.ID)){
            this.props.history.push("/")
        }
    }
    onChangeNickname=(event)=>{
        this.setState({
            name:event.target.value
        })

    }
    onChangeAboutMe =(event)=>{
        this.setState({
            aboutMe:event.target.value
        })

    }

  onChangeAvatar=(event)=>
   {
     
        if(event.target.files && event.target.files[0])
        {
          /*const prefixFiletype = event.target.files.type.tostring()
            if(prefixFiletype.indexOf(LoginString.PREFIX_IMAGE) !== 0)
            {
                this.props.ShowToast(0,"This file is not an Image")
                return
            }*/
            this.newPhoto= event.target.files[0] 
            this.setState({photoUrl:URL.createObjectURL(event.target.files[0])})
        }
        else
        {
            this.props.ShowToast(0,"Something worng with input file")
        }
    }

    uploadAvatar=()=>
    {
        this.setState({isLoding:true})
        if(this.newPhoto){
            const UploadTask = firebase.storage()
            .ref()
            .child(this.state.id)
            .put(this.newPhoto)
            UploadTask.on(
                LoginString.UPLOAD_CHANGED,
                null,
                err =>{
                    this.props.ShowToast(0,err.message)
                },
                ()=>{
                    UploadTask.snapshot.ref.getDownloadURL().then(downloadURL=>{
                        this.updateUserInfo(true,downloadURL)
                    })
                }
            )

        }else{
            this.updateUserInfo(false,null)
        }
    }

    updateUserInfo=(isUpdatePhotoURL,downloadURL)=>{
        let newinfo
            if(!isUpdatePhotoURL){
                newinfo={
                    name:this.state.name,
                    Description:this.state.aboutMe,
                    URL: downloadURL
                }
            }else
            {
                newinfo={
                    name:this.state.name,
                    Description:this.state.aboutMe,
                    URL: downloadURL
                    
                }
                firebase.firestore().collection('users')
                .doc(this.state.documentkey)
                .update(newinfo)
                .then(data=>{
                    localStorage.setItem(LoginString.Name,this.state.name)
                    localStorage.setItem(LoginString.Description,this.state.aboutMe)
                    if(isUpdatePhotoURL)
                    {
                        localStorage.setItem(LoginString.PhotoURL,downloadURL)
                    }
                     this.setState({isLoding:false})
                     this.props.ShowToast(1,'Update info Success')
                })


            }
        
    }

    render(){
        return(
            <div className="profileroot">
                <div className="headerprofile">
                    <span>Profile</span>
                </div>
                <img className="avatar" alt="" src={this.state.photoUrl}  />

                <div className="viewWrapInputFile">
                <img className="imgInputFile"
                    alt="icon gallery"
                    src={images.choosefile}
                   onClick={() => {this.refinput.click()}}
                    /> 
                    <input
                    ref = {
                        el =>{
                        this.refinput=el
                     }}
                    accept = "image/*"
                    className="viewInputFile"
                    type="file"
                    onChange={this.onChangeAvatar.bind(this)}
                    />
                </div>
                
            <span className="textLabel"> Name</span>
            <input
            className="textInput"
            value={this.state.name ? this.state.name :""}
            placeholder="Your nickname...."
            onChange={this.onChangeNickname}
            />
            <span className="textLabel"> About Me</span>
            <input
            className="textInput"
            value={this.state.aboutMe ? this.state.aboutMe :""}
            placeholder="Tell about yourself..."
            onChange={this.onChangeAboutMe}
            />
            <div>
                <button className="btnUpdate" onClick={this.uploadAvatar}>
                    Save
                </button>
                <button className="btnback" onClick={()=>{this.props.history.push('/chat')}}>
                    Back

                </button>

            </div>
           {
                this.state.isLoding ?(
                    <div>
                        <ReactLoading
                        type={'spin'}
                        color={"#203152"}
                        height={'3%'}
                        width={'3%'}/>
                        
                    </div>
     
                 ): null
           }

          </div>
        )
    }
}