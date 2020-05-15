import React from 'react';
import { push } from "connected-react-router";
import { routes } from "../Router/index";
import { connect } from "react-redux";
import axios from 'axios';
import * as firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import '../../style/index.css'
import Header from "../../components/Header";
import { sendVideos } from '../../actions/videos'

const formSendVideo = [
    {
        name: 'url',
        type: 'text',
        label: 'URL ',
        placeholder: 'URL do video',
        required: true,
        variant: "outlined",
     },
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
    
`;

export class SendVideo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          form:{},
          videoId: "",
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleFieldChange = event => {
        const { name, value } = event.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    };

    sendNewVideo = async(e) =>{   
        e.preventDefault()
        const idVideo = await firebase.firestore().collection("sendVideo").doc().get().then(doc => doc.id);
        const { url, title, description} = this.state.form
        this.props.sendVideos(url, title, description, idVideo) 
        window.alert("Video Enviado com sucesso")
        this.setState({form: ""})
        this.props.goToFeedPage();
    }

    render(){
        return(
            <ContainerSendVideo>
                <Header/>
                <SignupWrapper>
                    <Title>Envie seu video</Title>
                    {formSendVideo.map(input => (
                        <TextFiled
                            onChange={this.handleFieldChange}
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            required={input.required}
                            value={this.state.form[input.name] || ""}
                            placeholder={input.placeholder}
                            pattern={input.pattern}
                            variant={input.variant}
                        />
                    ))}
                </SignupWrapper>
                <div class="container">
                    <a onClick={this.sendNewVideo} class="btn btn-2" type="submit">Enviar video</a>
                </div>
            </ContainerSendVideo>


        )
    }
}

const mapDispatchToProps = dispatch => ({    
       sendVideos: (url,title,description, idVideo) => dispatch(sendVideos(url,title,description,idVideo)), 
       goToFeedPage : () => dispatch(push(routes.feed)),
       goToLoginPage: () => dispatch(push(routes.loginPage))   
});

export default connect(null, mapDispatchToProps)(SendVideo);


