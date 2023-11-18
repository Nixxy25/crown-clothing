import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignIn from '../../components/sign-in/sign-in-form.component';

import "./authentication.styles.scss"
const Auth = () => {
    return(
        <div className='authentication-container'>
            <SignIn />
            <SignUpForm />
        </div>
        
    )
}

export default Auth;