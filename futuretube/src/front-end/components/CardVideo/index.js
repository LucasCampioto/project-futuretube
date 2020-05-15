import React from 'react';
import "firebase/firestore"
import { push } from "connected-react-router";
import { routes } from "../../containers/Router/index";
import { connect } from "react-redux";
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { deleteVideo, setVideoIdSelected } from "../../actions/videos";

const ContainerVideo = styled.div`
    width: 30vw;
    height:auto;
    background-color: #fff;
    -webkit-box-shadow: 6px 6px 10px #999; 
	-moz-box-shadow: 6px 6px 10px #999;
     box-shadow: 6px 6px 10px #999;
     border-radius:15px;           
`

const ContainerInformationVideo = styled.div`
    height:auto;
    text-align:center;
    width:auto;
    padding-bottom:15px;
`

const TitleVideo = styled.h3`
    font-weight:bold;
`

const DescriptionVideo = styled.p`
    font-size:16px;
    margin-top:-5px;
    word-wrap: break-word;
`

const EditVideoIcon =  styled.span`
    cursor:pointer;
`

const DeleteVideoIcon =  styled.span`
 color:red;
 margin-left:15px;
 cursor:pointer;
`

const MoreInformationVideo = styled.span`
margin-left:12px;
cursor:pointer;
`

export class CardVideo extends React.Component{
    constructor(props){
        super(props)
    }


    handleDeleteVideo = async (videoId) => {
        try{
            videoId = this.props.video.id;   
            this.props.deleteVideo(videoId);
        }catch(e){
            console.log(e.message)
        }
        
    }

    handleEditVideoPage = (videoId) => {
        this.props.setVideoIdSelected(videoId);
        this.props.goToEditVideoPage();
    }

    handleVideoDetailsPage = (videoId) =>{
        this.props.setVideoIdSelected(videoId);
        this.props.goToVideoDetails()
    }

    render(){
        return(
            <div>
                <ContainerVideo key={this.props.video.id} >
                    <ReactPlayer 
                    url={this.props.video.url} 
                    width='30vw'
                    height='40vh'
                    />
                    <ContainerInformationVideo>
                        <TitleVideo>{this.props.video.title}</TitleVideo>
                        <DescriptionVideo>{this.props.video.description}</DescriptionVideo>
                        <EditVideoIcon key={this.props.video.id} onClick={() => this.handleEditVideoPage(this.props.video.id)} > <EditIcon />  </EditVideoIcon>
                        <DeleteVideoIcon> <DeleteIcon onClick={this.handleDeleteVideo}/> </DeleteVideoIcon>
                        <MoreInformationVideo id={this.props.video.id} onClick={() => this.handleVideoDetailsPage(this.props.video.id)}> < MoreHorizIcon /> </MoreInformationVideo>
                    </ContainerInformationVideo>
                </ContainerVideo> 
            </div>              
        )
    }

}

const mapDispatchToProps = dispatch => ({
    goToEditVideoPage: () => dispatch(push(routes.editVideo)),
    goToVideoDetails: () => dispatch(push(routes.videosDetails)),
    deleteVideo: (videoId) => dispatch(deleteVideo(videoId)),
    setVideoIdSelected: (videoId) => dispatch(setVideoIdSelected(videoId))
})

export default connect(null,mapDispatchToProps)(CardVideo);
