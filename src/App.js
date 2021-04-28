import React from 'react';
import { connect } from 'react-redux'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.playerInstance = React.createRef();
    }
    
    pauseVideo = () => {
        this.props.dispatch({
            type: "VIDEO_PAUSE"
        })
    }

    playVideo = () => {
        this.props.dispatch({
            type: "VIDEO_PLAY"
        })
        
    }

    restartVideo = () => {
        this.props.dispatch({
            type: "VIDEO_RESTART"
        })
        
    }

    loadVideo = (url) => {
        this.props.dispatch({
            type: "VIDEO_LOAD",
            payload: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        })
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.state.playerState == 'playing' && prevProps.state.playerState !== 'playing') {
            if (this.playerInstance.current) {
                this.playerInstance.current.play();
                this.props.dispatch({
                    type: "VIDEO_DURATION",
                    payload: this.playerInstance.current.duration
                })
            } else {
                window.alert("No Video Loaded")
            }
        }

        if (this.props.state.playerState == 'paused' && prevProps.state.playerState !== 'paused') {
            if (this.playerInstance.current) {
                this.playerInstance.current.pause();
            }
        }

        if (this.props.state.playerState == 'restart' && prevProps.state.playerState !== 'restart') {
            if (this.playerInstance.current) {
                this.playerInstance.current.currentTime = 0;
            }
            this.playVideo();
        }
    }


    render() {
        return (
            <div>
                {this.props.state.contentUri ? <video width="50%" ref={this.playerInstance} src={this.props.state.contentUri}></video> : null }
                <br />
                <button onClick={this.loadVideo}>
                    Load Video
                </button>
                <button onClick={this.playVideo}>
                    Play Video
                </button>
                <button onClick={this.pauseVideo}>
                    Pause Video
                </button>
                <button onClick={this.restartVideo}>
                    Restart Video
                </button>
                <br />
                {this.props.state.duration ? `This video is ${this.props.state.duration} seconds long` : null }

                

                
            </div>
        )
    }
}

const mapStateToProps = (state => {
    return {
        state
    }
})
export default connect(mapStateToProps)(App);