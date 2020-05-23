import React from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css'

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.playerRef = React.createRef();
        this.uiRef = React.createRef();
        this.player = null;
        this.state = {
            isVideoLoaded: false,
            codec:""
        }
    }

    componentDidMount() {
        const videoElement = this.playerRef.current;
        const SEGMENT_SIZE = 2;
        this.player = new shaka.Player(videoElement);
        new shaka.ui.Overlay(
            this.player,
            this.uiRef.current,
            videoElement
        )

        setInterval(() => {
            this.props.timeHandler(this.playerRef.current.currentTime);
            this.setState({codec:this.player.getVariantTracks().filter((track) => {if(track.active == true){return track}})[0].videoCodec})
            //console.log(this.player.getStats())
        },1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.state.isVideoLoaded){
            this.player.load(this.props.video.mpd)
            this.playerRef.current.poster = this.props.video.poster;
            this.setState({isVideoLoaded:true})
        }
    }

    render() {
        return (
            <div style={{width:'100%'}} ref={this.uiRef}>
                <video ref={this.playerRef}
                       width="100%"
                       autoPlay={true}></video>
                {this.state.codec}
            </div>)
    }
}

export default Player;
