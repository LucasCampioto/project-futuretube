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

const CadastroForm = [
     {
        name: 'email',
        type: 'email',
        label: 'E-mail',
        placeholder: 'Digite seu e-mail',
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

export class ChangePassword extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",  
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
   
    onSubmitEditVideo = async(e) =>{
        e.preventDefault();  
    }

    changePassword = async => {
        var auth = firebase.auth();
        var emailAddress = this.state.email;
        auth.sendPasswordResetEmail(emailAddress).then(function() {
            window.alert("Foi enviado um email para que redefinir sua senha")
        }).catch(function(error) {
            console.log(error.message)
        });
      }

    render(){
        return(
            <ContainerSendVideo>
                <Header/>
                <SignupWrapper>
                    <Title>Redefinir Senha</Title>
                    {CadastroForm.map(input => (
                        <TextFiled
                            onChange={this.handleChange}
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
                    <a onClick={this.changePassword} class="btn btn-2" type="submit">Enviar</a>
                </div>
            </ContainerSendVideo>
        )
    }
}

