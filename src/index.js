import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux'
import App from './App';


// Simple State for a video player
const initialState = {
    playerState: "stopped",
    contentUri: null,
    duration: null,
    currentTime: null
}
const playerReducer = (state = {}, action) => {
    switch (action.type) {
        case "VIDEO_LOAD":
            return {
                ...state,
                contentUri: action.payload,
                currentTime: 0
            }
        break;
        case "VIDEO_PLAY":
            return {
                ...state,
                playerState: "playing"
            }
        break;
        case "VIDEO_PAUSE":
            return {
                ...state,
                playerState: "paused"
            }
        break;
        case "VIDEO_DURATION":
            return {
                ...state,
                duration: action.payload
            }
        break;
        case "VIDEO_RESTART":
            return {
                ...state,
                playerState: "restart"
            }
        break;
    }
    
    return state
}

const store = createStore(
    playerReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function logger() { 
    const state = store.getState();
    console.log({ currentState: state})
}
store.subscribe(logger)


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
)