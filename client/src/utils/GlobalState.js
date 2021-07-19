import React, { createContext, useReducer, useContext } from "react";
// import actions
import { QUERY_APPLE_URI, QUERY_SPOTIFY_URI, UPDATE_LIST_RESULTS, LOGIN, LOADING } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
    // switch on action type
    switch(action.type){
        case QUERY_APPLE_URI:
            return {
                ...state,
                inputURI: action.URI,
                inputURIType: 'Apple'
            }
        case QUERY_SPOTIFY_URI:
            return {
                ...state,
                inputURI: action.URI,
                inputURIType: 'Spotify'
            }
        case UPDATE_LIST_RESULTS: 
            return {
                ...state,
                inputListResults: action.results
            }
        case LOADING: 
            return {
                ...state,
                loading: action.loading
            }
        case LOGIN: 
            return {
                ...state,
                user: action.user,
                loggedIn: true
            }
        default: 
            return state;
    }
}

const StoreProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        inputURI: "",
        inputURIType: 'Apple',
        inputListResults: [],
        outputURI: "",
        conflicts: [],
        loading: false,
        loggedIn: false,
        user: {}
    });

    return <Provider value={[state, dispatch]} {...props} />;

};

const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };