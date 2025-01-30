import styled from "styled-components";
import {SubmitButton,CancelButton,Input,Label} from "../components/BaseComponents";

const SContainer = styled.div`

    display: flex;
    justify-content: center; /* Horizontal centering */
    align-items: center; /* Vertical centering */
    height: 100vh;
    background-color: #1122;
    `
    
const SBox = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px solid black;
    border-radius: 1rem;
    width: 50%;
    max-width: 30rem;
    height: 50%;
    padding: 20px;
    background-color: white;

`
const SForm = styled.form
`margin: auto;
`
const SButtonsWrapper = styled.div`
    display flex;
    flex-flow: row wrap;

`
const SLink = styled.a`
    margin-left: auto;
    color: blue;
    &:hover {
    color: blue;
    text-decoration-line: underline;
    }
`
const SRegElements = styled.div`
    display : ${props => props.visible ? 'blcok' : 'none' };
`

const LogIn = (props) =>
{
    const formType = 'login';
    const showRegElements = !(formType === 'login');
    const submitButtonLabel = formType === 'login' ? 'Log in' : 'Sign up';
    const redirectButtonLabel = formType === 'login' ? 'Register here' : 'Log in here';
    return(
        <SContainer>
            <SBox>
                    <SForm>
                        <Label>Username</Label>
                        <Input type='text'></Input>
                        <Label>Password</Label>
                        <Input type="password"></Input>
                        <SRegElements visible= {showRegElements}>   
                        <Label>Repeat password</Label>
                        <Input type="password"></Input>
                        </SRegElements>
                        <SubmitButton>{submitButtonLabel}</SubmitButton>
                        
                        
                    </SForm>
                    <SLink href='/registration'>{redirectButtonLabel}</SLink>
                </SBox>
        </SContainer>
    );
}

export default LogIn;