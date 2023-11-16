import { useState } from "react";

import { 
    signInUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
    signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';
import { limit } from "firebase/firestore";

const defaultFormFields ={
    email:'',
    password:'',
}
const SignIn = () => {
    const [formFields, setFormFieds] = useState(defaultFormFields)
    const{email, password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFieds(defaultFormFields)
    }

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response = await signInUserWithEmailAndPassword(email, password)
            console.log(response);
            resetFormFields();

        }catch(error){
          
        }
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFieds({...formFields, [name]: value});
    };
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>   
                <FormInput
                    label="Email"
                    type="email" 
                    required onChange={handleChange}
                    name="email"
                    value={email}
                />


                <FormInput
                    label='Password'
                    type="password" 
                    required onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div>
                    <Button buttonType="google" onClick={logGoogleUser}>Google Sign In</Button>
                    <Button type="submit">Sign Up</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignIn;