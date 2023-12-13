import { useEffect,createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}
const userReducer = (state, action) => {
    console.log("dispatched");
    console.log(action);
    const {type, payload} = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }

}

const INITAIL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) =>{
    const [{currentUser}, dispatch] = useReducer(userReducer, INITAIL_STATE)

    const setCurrentUser = (user) => {
        dispatch(
            createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user ));
        };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener ((user) =>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            console.log(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

