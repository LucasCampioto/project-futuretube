import React from 'react';
import { push } from "connected-react-router";
import { routes } from "../Router/index";
import { connect } from "react-redux";
import "firebase/auth"
import "firebase/firestore"
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import '../../style/index.css'
import Header from "../../components/Header";
import { editVideo } from "../../actions/videos";
import {getVideosDetails} from "../../actions/videos"

const CadastroForm = [
     {
        name: 'title',
        type: 'text',
        label: 'Titulo',
        placeholder: 'Titulo do video',
        required: true,
        variant: "outlined",
    },
    {
        name: 'description',
        type: 'text',
        label: 'Descrição',
        placeholder: 'Descrição do video',
        required: true,
        variant: "outlined",
     },
     
]

const ContainerSendVideo = styled.div`
    font-family: 'Roboto', sans-serif;
`
const Title = styled.h1`
    font-size:30px;
    color:black;

`
 const SignupWrapper = styled.form`
  width: 100%;
  margin-top:100px;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
  margin-bottom:20px;
`;

 const TextFiled = styled(TextField)`
    background-color:transparent;
    text-align:center;
    width:300px;
    border-radius:5px;
    
`


export class EditVideoPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            form:{},
        }
    }
  
    handleFieldChange = event => {
        const { name, value } = event.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    };
 
   editVideos = async(videoId) =>{ 
        try{
            const {title,description} = this.state.form
            videoId = this.props.videoIdSelected
            this.props.editVideo(title,description,videoId)
            window.alert("Video editado com sucesso")
            this.props.goToFeedPage()   
        }catch(e){
            console.log(e.message)
        }      
    }

    render(){ 
        return(
            <ContainerSendVideo>
                <Header/>
                <SignupWrapper>
                    <Title>Editar Video</Title>
                    {CadastroForm.map(input => (
                        <TextFiled
                            onChange={this.handleFieldChange}
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            required={input.required}
                            placeholder={input.placeholder}
                            pattern={input.pattern}
                            variant={input.variant}
                        />
                    ))}
                </SignupWrapper>
                <div class="container">
                    <a class="btn btn-2" type="submit" onClick={this.editVideos} >Enviar Alteraçõe</a>
                </div>
            </ContainerSendVideo>


        )
    }
}

function mapStateToProps (state){
    return{
       videoIdSelected: state.videos.videoIdSelected,
       videoDetails: state.videos.videosDetails,  
    }
}

function mapDispatchToProps (dispatch) {
    return{
        goToFeedPage: () => dispatch(push(routes.feed)),
        editVideo: (videoId,title,description) => dispatch(editVideo(videoId,title,description)),
        getVideosDetails: (videoId) => dispatch(getVideosDetails(videoId)),
    } 
}

export default connect(mapStateToProps,mapDispatchToProps)(EditVideoPage);

