import React from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css'

class Player extends React.Component {
    constructor() {
        super();
        this.playerRef = React.createRef();
        this.uiRef = React.createRef();
    }

    componentDidMount() {
        const videoElement = this.playerRef.current;
        const player = new shaka.Player(videoElement);
        new shaka.ui.Overlay(
            player,
            this.uiRef.current,
            videoElement
        )


        player.load(this.props.video.mpd).then(() => {
            setInterval(
                () => {
                    this.props.timeHandler(videoElement.currentTime)
                }, 1000
            )
        })
    }

    render() {
        return (
            <div style={{width:'100%'}} ref={this.uiRef}>
                <video ref={this.playerRef}
                       width="100%"
                       poster={this.props.video.poster}
                       ></video>
            </div>)
    }
}

export default Player;
