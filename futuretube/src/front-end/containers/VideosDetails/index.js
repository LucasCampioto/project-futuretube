import React from 'react';
import * as firebase from "firebase/app";
import styled from 'styled-components';
import "firebase/firestore"
import Header from "../../components/Header";
import { connect } from "react-redux";
import { getVideosDetails } from '../../actions/videos'
import Avatar from '@material-ui/core/Avatar';

const Container = styled.div`
    display:flex;
    justify-content:center;
    margin-top:30px;
`
const TitleVideosDetails = styled.h1`
    font-size:35px;
    text-align:center;
    margin-top:100px;
`

const ContainerVideo = styled.div`
    width: 30vw;
    height:auto;
    margin-bottom:15px;
    padding:10px 0px;
    background-color: #fff;
    text-align:center;
    -webkit-box-shadow: 6px 6px 10px #999; 
	-moz-box-shadow: 6px 6px 10px #999;
     box-shadow: 6px 6px 10px #999;           
`

const ContainerVideoHeader = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:55px;
    font-weight:bold;
    margin-top:-10px;
    background-color:#480074;
`

const UserName = styled.p`
    margin-left:10px;
    color:white;

`

export class VideosDetails extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            userDetails: {}
        }
    }

    componentDidMount(){
        this.getDetailsVideo()
        this.usersDetails()
    }

    getDetailsVideo = async(videoId) =>{
        try{
            videoId = this.props.videoIdSelected
            this.props.getVideosDetails(videoId)
        }catch(e){
            console.log(e.message)
        }
    }

    usersDetails = async() =>{
        try{
            const userId = await firebase.firestore().collection("users").doc().get().then(doc => doc.Tv.fv.currentUser.uid); 
            const verifyUserId = firebase.auth().currentUser.uid
            if(userId === verifyUserId) {
                const userDetails = await firebase.firestore().collection("users").doc(userId).get().then(doc => doc.data())
                this.setState({userDetails: userDetails})
            }
        }catch(e){
            console.log(e.message)
        }
        
    }

    render(){
        return(
            <div>
                <Header />
                <TitleVideosDetails>Detalhes do video</TitleVideosDetails>
                <Container>
                <ContainerVideo>
                    <ContainerVideoHeader>
                        <Avatar alt="Usuário" src={this.state.userDetails.photo} />
                        <UserName> {this.state.userDetails.username} </UserName>
                    </ContainerVideoHeader>
                    <p><b>Titulo: </b> {this.props.getVideosDetailsReducer.title}</p>
                    <p><b>Descrição: </b> {this.props.getVideosDetailsReducer.description} </p>
                    <p><b>Url: </b> {this.props.getVideosDetailsReducer.url} </p>
                </ContainerVideo>
                </Container> 
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    videoIdSelected: state.videos.videoIdSelected,
    getVideosDetailsReducer: state.videos.videoDetails,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getVideosDetails: (videoId) => dispatch(getVideosDetails(videoId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosDetails);