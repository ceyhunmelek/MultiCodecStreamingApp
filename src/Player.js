import React from 'react';
import shaka from 'shaka-player/dist/shaka-player.compiled';

class Player extends React.Component {

    componentDidMount() {
        let video = document.getElementById('video');
        let player = new shaka.Player(video);
        window.player = player;
        player.load("https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd").then(function() {
            console.log('The video has now been loaded!');
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <video id="video"
                           width="640"
                           poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
                           controls autoPlay></video>
                </div>
            </div>)
    }
}

export default Player;
