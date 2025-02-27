import UserDataForm from "../components/UserDataForm/UserDataForm";

function Registration()
{
    function submit(username,password,rePassword)
    {

    }
    return(<UserDataForm formType='registration' submitFunction={submit}></UserDataForm>);
}

export default Registration;