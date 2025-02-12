import UserDataForm from "../components/UserDataForm/UserDataForm";

function Login()
{
    function submit(username,password)
    {

    }
    return(<UserDataForm formType='login' submitFunction={submit}></UserDataForm>);
}

export default Login;