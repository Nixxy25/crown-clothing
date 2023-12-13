import { useState} from "react";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"


import { 
    signInUserWithEmailAndPassword,
    signInWithGooglePopup} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';


const defaultFormFields ={
    email:'',
    password:'',
}
const SignIn = () => {
    const [formFields, setFormFieds] = useState(defaultFormFields)
    const{email, password} = formFields;



    const resetFormFields = () => {
        setFormFieds(defaultFormFields)
    }

    const logGoogleUser = async () =>{
        await signInWithGooglePopup();
        
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
          await signInUserWithEmailAndPassword(
                email, 
                password)
            resetFormFields();

        }catch(error){
            if(error.code === "auth/invalid-login-credentials"){
                alert("incorrect password ")
            }
          console.log(error);
        }
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFieds({...formFields, [name]: value});
    };
    return(
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign In with your email and password</span>
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

                <div className="buttons-container">
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Google Sign In</Button>
                    <Button type="submit">Sign In</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignIn;