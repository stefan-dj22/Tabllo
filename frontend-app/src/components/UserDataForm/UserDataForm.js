import styled from "styled-components";
import {SubmitButton,Input,Label} from "../BaseComponents";
import { useState } from "react";

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
const SForm = styled.form`
    margin: auto 5%;
`

const SLink = styled.a`
    margin-left: auto;
    color: blue;
    &:hover {
    color: blue;
    text-decoration-line: underline;
    }
`

const UserDataForm = (props) =>
{
    const [errorMsg, setErrorMsg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const {formType, submitFunction} = props;

    const isRegistartionForm = !(formType === 'login');
    const submitButtonLabel = (formType === 'login') ? ('Log in') : ('Sign up');
    const redirectButtonLabel = (formType === 'login') ? ('Register here') : ('Log in here');
    const redirectionPath = (formType === 'login') ? ('/register') : ('/login');
    const errorLabelDisplay = errorMsg ? 'block' : 'none';

    
    /**
     * Checks if the given username is already in use.
     * This function needs to be defined in the future to check against the server database.
     *
     * @param {string} username - The username to check.
     * @returns {boolean} - Returns true if the username is already in use, otherwise false.
     */
    function alreadyInUse(username)
    {
        return false;
    }
    function validateInputs()
    {
        if((username && password && (rePassword || !isRegistartionForm)) == false)
        {
            setErrorMsg("Please fill all fields");
            return false;
        }
        if(alreadyInUse(username)) {
            setErrorMsg('Username is already in use');
            return false;
        }
        setErrorMsg("");
        return true;        

    }
    function validatePasswords() {
    if ((password !== rePassword) && isRegistartionForm)
        {
            setErrorMsg("Typed password don't match");
            return false;
        }
        setErrorMsg("");
        return true;
    }

    function validateUsername(username) {
        if (username.includes(" ") || username.includes("<") || username.includes(">")) {
            setErrorMsg("Invalid username");
            return false;
        }
        setErrorMsg("");
        return true;
    }

    const onUsernameChange = (input) => {
        setUsername(input.value);
        validateUsername(input.value);
   };

    const onPasswordChange = (input) => {
        setPassword(input.value);
    };

    const onRePasswordChange = (input) => {
        setRePassword(input.value);
    };

    const handleFormData = (event) =>
    {
        event.preventDefault();
        if(validateInputs() && validatePasswords())
        {
            submitFunction(username,password,rePassword);
        }
    }

    return(
        <SContainer>
            <SBox>
                    <SForm onSubmit={handleFormData}>
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type='text' onChange={(event) => onUsernameChange(event.target)}></Input>

                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" onChange={(event) => onPasswordChange(event.target)}></Input>

                        <div style={{display: isRegistartionForm ? 'block' : 'none' }}>   
                            <Label htmlFor="rePassword">Repeat password</Label>
                            <Input id="rePassword" type="password" onChange={ (event) => onRePasswordChange(event.target)}></Input>
                        </div>
                        <Label color='red' display={errorLabelDisplay}>{errorMsg}</Label>
                        <br/>
                        <SubmitButton>{submitButtonLabel}</SubmitButton>
                    </SForm>
                    <SLink href={redirectionPath}>{redirectButtonLabel}</SLink>
                </SBox>
        </SContainer>
    );
}

export default UserDataForm;