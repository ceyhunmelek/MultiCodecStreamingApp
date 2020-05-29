import React from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css'

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.timeRefInterval = null;
        this.playerRef = React.createRef();
        this.uiRef = React.createRef();
        this.player = null;
        this.state = {
            isVideoLoaded: false
        }
    }

    componentWillUnmount() {
        clearInterval(this.timeRefInterval)
    }

    componentDidMount() {
        const videoElement = this.playerRef.current;
        this.player = new shaka.Player(videoElement);
        new shaka.ui.Overlay(
            this.player,
            this.uiRef.current,
            videoElement
        )

        let prevEstimated = 0;
        this.timeRefInterval = setInterval(() => {
            let currentStats = this.player.getStats();
            if(currentStats.stateHistory[currentStats.stateHistory.length -1].state === "playing" && prevEstimated != currentStats.estimatedBandwidth){
                this.props.chartHandler(currentStats);
                prevEstimated = currentStats.estimatedBandwidth;
            }
            /* To Show codec*/
            this.setState({
                codec: this.player.getVariantTracks().filter(track => {
                    if (track.active === true) {
                        return track
                    }
                })[0].videoCodec
            });
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.isVideoLoaded) {
            this.player.load(this.props.video.mpd)
            this.playerRef.current.poster = this.props.video.poster;
            this.setState({isVideoLoaded: true})
        }
    }

    render() {
        return (
            <div style={{width: '100%'}} ref={this.uiRef}>
                <video ref={this.playerRef}
                       width="100%"
                       autoPlay={true}></video>
                <p style={{color:'red',fontWeight:'bold',fontSize:'25pt',position:"fixed",right:"0px",top:'0px'}}>
                    {this.state.codec}
                </p>
            </div>)
    }
}

export default Player;
