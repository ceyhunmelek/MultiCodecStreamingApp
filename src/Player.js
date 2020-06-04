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

        this.timeRefInterval = setInterval(() => {
            let currentStats = this.player.getStats();
            let buffered = this.playerRef.current.buffered;
            let bufferData = {start:0, end:0, time:0};

            if (buffered.length === 1) {
                bufferData.time=this.playerRef.current.currentTime;
                bufferData.start = buffered.start(0);
                bufferData.end = buffered.end(0);
            }

            let codec = this.player.getVariantTracks().filter(track => {
                if (track.active === true) {
                    return track
                }
                return null
            })[0].videoCodec
            if(codec.toLowerCase().includes("vp")){
                codec = "vp9"
            }else if(codec.toLowerCase().includes("hev")){
                codec = "h265"
            }else{
                codec = "h264"
            }
            if(currentStats.stateHistory[currentStats.stateHistory.length -1].state === "playing"){
                this.props.chartHandler(currentStats,codec,bufferData);
            }
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
            <div className={"mac-container"}>
                <div>
                    <div ref={this.uiRef}>
                        <video className={""} ref={this.playerRef}
                               width={'100%'}
                               autoPlay={true}></video>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;
