import React, {createContext, useReducer, useContext, useEffect} from 'react';
import {useSession} from "next-auth/react";
import {hasSession} from "@/helper/frontend/session-helper";
import axios from "axios";

// Define the context
const UserContext = createContext();

// Reducer function to handle actions
function userReducer(state, action) {
    switch (action.type) {
        case 'ADD_USER':
            return {...action.payload}; // Add a new user
        case 'UPDATE_USER':
            return {...user, ...action.payload};
        case 'GET_USER':
            return state; // Simply return state, though typically you'd fetch and return specific user data
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function UserProvider({children}) {

    const {data: session, status} = useSession();
    const [state, dispatch] = useReducer(userReducer, {
        username: 'guest',
        email: 'guest'
    }); // Initial state is an empty array

    // Value to be passed to the context
    const value = {state, dispatch};

    useEffect(() => {
        console.log('get user...', session, status);

        if (status === 'authenticated') {
            // Now we are sure the session is loaded and there is a user
            axios.get(`/api/user/${session.user.email}`)
                .then(res => res.data)
                .then(data => {
                    dispatch({
                        type: 'ADD_USER',
                        payload: data
                    });
                })
                .catch(error => console.error('Fetching user data failed:', error));
        }
    }, [session, status, dispatch]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

