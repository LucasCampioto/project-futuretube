import React from 'react';
import { push } from "connected-react-router";
import { routes } from "../Router/index";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LogoFuture from '../../../img/future.png';
import Passaro from '../../../img/passaro.png';

const ContainerLogin = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    margin: auto;
    background-color: #e8c2ff;
    min-height: 100vh;
`

const TextLoginPage = styled.h1`
    color:black;
`

const LoginWrapper = styled.form`
    width: 100%;
    gap: 10px;
    place-content: center;
    justify-items: center;
    display: grid;
`;

const TextFiled = styled(TextField)`
    background-color:transparent;
    text-align:center;
    width:300px;
    border-radius:5px;
`

const LoginButton = styled(Button)`
    background-color: black;
    color: white;
    width: 125px;
    margin-top:20px;
`

const SignUpButon = styled.span`
    font-weight:bold;
    cursor:pointer;
    margin-top:8px;
`
const ChangePasswordButton = styled.span`
    font-weight:bold;
    cursor:pointer;
`

const ImageLogo = styled.img`
    width:350px;
    height:350px;
    margin-left:30px;
    margin-top:-150px;
`

const ContainerLogo = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    margin-top: -20px;
    margin-bottom:-50px;
    
`

const ContainerIllustration = styled.div`
    margin-bottom:-60px;
    margin-right:0px;
    background-color: #92e2fd;
`

const ImageIllustration = styled.img`
    position: absolute;
    width:400px;
    height:350px;
    
`
export class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:"",
            password:""
        }
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    onSubmitLogin = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await firebase.auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
         this.props.goToFeedPage() 
        } catch (e) {
          console.log(e.message);
          window.alert("Usuário inválido")
        }  
      };

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
                <ContainerLogin>
                    <ContainerLogo>
                        <ImageLogo src={LogoFuture} />
                    </ContainerLogo>
                    <ContainerIllustration>
                        <ImageIllustration src={Passaro} />
                    </ContainerIllustration>                 
                    <TextLoginPage>Login</TextLoginPage>
                    <LoginWrapper>
                      <TextField 
                         onChange={this.handleChange}
                         color="primary-light"
                         name="email"
                         type="email"
                         label="E-mail"
                         required
                         variant="outlined" />                          
                      <TextField 
                         onChange={this.handleChange}
                         name="password"
                         type="password"
                         label="Password"
                         required
                         variant="outlined" />
                        <div  class="container">
                            <a onClick={this.onSubmitLogin} class="btn btn-2">Logar</a>
                        </div> 
                        <SignUpButon onClick={this.props.goToSignUpPage}>Não possui cadastro? Clique aqui</SignUpButon>
                        <ChangePasswordButton onClick={this.props.goToChangePasswordPage}>Esqueceu a senha?</ChangePasswordButton>       
                    </LoginWrapper>  
                </ContainerLogin>
            
        )
    }
}

const mapDispatchToProps = dispatch => ({
    goToSignUpPage: () => dispatch(push(routes.signUpPage)),
    goToFeedPage : () => dispatch(push(routes.feed)),
    goToChangePasswordPage: () => dispatch(push(routes.changePassword))
})

export default connect(null,mapDispatchToProps)(LoginPage);

