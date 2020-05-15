import React from 'react';
import { push } from "connected-react-router";
import { routes } from "../../containers/Router/index";
import { connect } from "react-redux";
import styled from 'styled-components';
import LogoFuture from '../../../img/future.png';
import PublishIcon from '@material-ui/icons/Publish';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import * as firebase from "firebase/app";
import "firebase/firestore"


const ContainerHeader = styled.div`
background-color:#2b0045;
width:100%;
height:100px;
font-family: 'Roboto', sans-serif;
`

const ImageLogo = styled.img`
    width:200px;
    height:200px;
    position:absolute;
    top:-52px;
    left:45px;
`

const ContainerLogo = styled.div`
    display:flex;
    justify-content:left;
    flex-direction: row;
    cursor:pointer;
`
const Items =  styled.p`
    font-size:17px;
    color:white;
    font-weight:bold;
    cursor:pointer;
    margin-right:30px;
    margin-top:35px;
`

const ItemsHeader = styled.div`
    display:flex;
    justify-content:center;
    margin-left:750px;
`

const ContainerAvatar = styled.div`
    display:flex;
    justify-content:center;
    margin-left:1150px;  
    margin-top:-55px;
    cursor: pointer;
`

export class Header extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            userDetail: {}
        }
        
    }

    componentDidMount(){
       this.usersDetails()
    }

    onSubmitLogout = async (e) => {
        e.preventDefault();
        firebase.auth().signOut()
        this.props.goToLoginPage();
      };
    
      usersDetails = async() =>{
        try{
        const userId = await firebase.firestore().collection("users").doc().get().then(doc => doc.Tv.fv.currentUser.uid); 
        const verifyUserId = firebase.auth().currentUser.uid
            if(userId === verifyUserId) {
                const userDetail = await firebase.firestore().collection("users").doc(userId).get().then(doc => doc.data())
                this.setState({userDetail: userDetail})
                console.log(" detalhes usuario header ", this.state.userDetail)
            }
        }catch(e){
            console.log(e.message)
        }
        
    }

    render(){
        return(
            <ContainerHeader>
                <ContainerLogo>
                    <ImageLogo src={LogoFuture} />
                </ContainerLogo>
                <ItemsHeader>
                    <Items onClick={this.props.goToSendVideo}> <PublishIcon/> </Items>
                    <Items onClick={this.onSubmitLogout}> <ExitToAppIcon /> </Items>
                </ItemsHeader>
                <ContainerAvatar>
                        <Avatar alt="Usuário" src={this.state.userDetail.photo} />
                </ContainerAvatar>                
            </ContainerHeader>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    goToSendVideo: () => dispatch(push(routes.sendVideo)),
    goToLoginPage: () => dispatch(push(routes.loginPage))
})

export default connect(null,mapDispatchToProps)(Header);