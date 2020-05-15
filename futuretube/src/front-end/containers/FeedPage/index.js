import React from 'react';
import * as firebase from "firebase/app";
import "firebase/firestore"
import { push } from "connected-react-router";
import { routes } from "../Router/index";
import { connect } from "react-redux";
import { getVideos } from '../../actions/videos'
import styled from 'styled-components';
import Header from "../../components/Header";
import CardVideo from "../../components/CardVideo"

const ContainerCardVideo = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap:15px;
    justify-items: center;
    margin-top: 20px;
    margin-bottom:20px;
    
`

export class FeedPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            videos:[],
        }
    }

    componentDidMount(){
       const verifyUser = firebase.auth().currentUser
       if(verifyUser === null){
           window.alert("É preciso logar")
           this.props.goToLoginPage()     
       }else{
           this.props.getVideos()
           this.testaUsers();
       }
        
    }

    testaUsers(){
        const users = firebase.auth().currentUser
    }

    render(){
        return(
            <div>
                <Header></Header>
                <ContainerCardVideo>
                    {this.props.getToVideos.map((video) =>(
                        <CardVideo
                            video={video}
                            />
                    ))}
                </ContainerCardVideo>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    getToVideos: state.videos.allVideos
})

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: () => dispatch(getVideos()),
        goToLoginPage: () => dispatch(push(routes.loginPage)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);